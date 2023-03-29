import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Namespace, Server} from 'socket.io';
import {Logger} from '@nestjs/common';
import {SocketWithAuth} from '../../common/types/socket.types';
import {GAME_ROOM_NAME} from '../../common/constants/game.constant';
import {Round} from '../../common/types/round.type';
import {getRandomNumber} from "../../common/helpers/getRandomNumber.helper";

@WebSocketGateway({
    namespace: 'game',
    cors: {
        origin: '*',
    },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    @WebSocketServer() io: Namespace;
    private logger: Logger = new Logger('AppGateway');

    private roundDuration = 18;
    private bettingTime = 5;
    private currentRound: Round = null;

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    async handleConnection(client: SocketWithAuth) {
        const sockets = this.io.sockets;
        client.totalPoint = 1100
        client.emit('totalPoint', client.totalPoint)
        client.join(GAME_ROOM_NAME);
        this.logger.debug(
            `Socket connected with ws client id: ${client.id}, and name : ${client.name}`,
        );
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);
        
        this.sendRankingInfo()
        this.io.emit('setCurrentRound', this.currentRound);
        console.log(sockets.size === 1, this.currentRound)
        if (sockets.size && sockets.size === 1 && !this.currentRound) this.startNewRound()
    }

    handleDisconnect(client: SocketWithAuth) {
        const sockets = this.io.sockets;

        this.logger.debug(
            `Socket disconnected with UserId: ${client.id}, and name : ${client.name}`,
        );
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    }

    @SubscribeMessage('chat')
    handleChatMessage(@MessageBody() message: string, @ConnectedSocket() client: SocketWithAuth) {
        this.server.to(GAME_ROOM_NAME).emit('message', {message, sender: client.name});
    }

    @SubscribeMessage('bet')
    handleBet(@MessageBody() payload, @ConnectedSocket() client: SocketWithAuth) {
        if (
            !this.currentRound ||
            new Date().getTime() > this.currentRound.endTime
        ) {
            client.emit('betError', 'No active round for betting');
            return;
        }

        const userExistBet = this.currentRound.bets.find(
            (el) => el.username === client.name,
        );
        if (userExistBet) return;
        this.currentRound.bets.push({
            username: client.name,
            points: payload.points,
            multiplier: payload.multiplier,
        });

        client.totalPoint -= payload.points
        client.emit('totalPoint', client.totalPoint)
        client.emit('betSuccess', this.currentRound);
        client.broadcast.to(GAME_ROOM_NAME).emit('betUpdate', this.currentRound);
    }

    private startNewRound() {
        const number = this.currentRound ? this.currentRound.number + 1 : 1;
        const startTime = new Date().getTime();
        const endTime = startTime + this.roundDuration * 1000;
        this.currentRound = {
            number,
            startTime,
            isBettingTimeEnd: false,
            endTime,
            roundMultiplier: 0,
            bets: [],
            betResults: [],
        };
        this.server.emit('newRound', this.currentRound);
        setTimeout(
            () => this.endRoundBet(),
            this.bettingTime * 1000,
        );
        setTimeout(() => this.endRound(), this.roundDuration * 1000);
    }

    private endRound() {
        if (!this.currentRound) return
        this.currentRound = null;
        this.server.emit('endRound', this.currentRound);

        if (this.io.sockets.size) setTimeout(() => this.startNewRound(), 2000);
    }

    private endRoundBet() {
        if (!this.currentRound) return
        this.currentRound.isBettingTimeEnd = true
        const currentRoundMultiplier = getRandomNumber(1, 10, 2)
        this.currentRound.roundMultiplier = +currentRoundMultiplier
        this.checkRoundBets()
        this.sendRankingInfo()
        this.server.emit('betEnd', this.currentRound)
        this.logger.debug(`currentRoundMultiplier: ${currentRoundMultiplier}`)
    }

    private checkRoundBets() {
        this.currentRound.bets.forEach(bet => {
            const clientWinPoint = bet.multiplier <= this.currentRound.roundMultiplier ? bet.points * bet.multiplier : 0

            this.currentRound.betResults.push({
                username: bet.username,
                points: clientWinPoint,
                multiplier: bet.multiplier
            })

            this.updateClientsTotalPoints(bet.username, clientWinPoint)
        })
    }

    private updateClientsTotalPoints(username: string, clientWinPoint: number) {
        this.io.sockets.forEach((socket: SocketWithAuth) => {
            if (socket.name === username) {
                socket.totalPoint += clientWinPoint
                socket.emit('totalPoint', socket.totalPoint)
            }
        })
    }

    private sendRankingInfo() {
        const ranking = []
        this.io.sockets.forEach((socket: SocketWithAuth) => {
            ranking.push({username: socket.name, score: socket.totalPoint})
        })
        ranking.sort((a, b) => b.score - a.score)
        this.server.emit('ranking', ranking)
    }
}
