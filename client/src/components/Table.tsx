import React from 'react';
import {TableProps} from '../types/Table';

const Table = <T, >({heads, rows}: TableProps<T>) => {
    return (
        <table className='min-w-full ring-1 ring-gray-600 overflow-hidden rounded-md'>
            <thead>
            <tr className={'bg-gray-900'}>
                {heads.map((k, i) => (
                    <th
                        key={i}
                        scope='col'
                        className={`${
                            i === 0 ? 'pl-4 pr-3 rounded-tl-md' : 'px-3'
                        } py-1 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-3 capitalize`}
                    >
                        {k}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody className=''>
            {rows.map((row, rowKey) => (
                <tr key={rowKey}>
                    {heads.map((column: keyof T, columnKey) => (
                        <td
                            key={columnKey}
                            className={`whitespace-nowrap ${
                                columnKey === 0 ? 'pl-4 pr-3' : 'px-3'
                            }
                             py-2 text-sm text-green-400`}
                        >
                            {row[column] as string}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
