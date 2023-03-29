import React, {FC} from 'react';

interface InputProps {
    value: number
    setValue: (value: number) => void
}

const Input: FC<InputProps> = ({value, setValue}) => {
    return (
        <input
            className={'w-2/3 bg-gray-900 text-center rounded outline-0'} type='number'
            value={Number(value).toString()}
            onChange={e => setValue(+e.target.value)}
        />
    );
};

export default Input;