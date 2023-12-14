import React from "react";
import { timeFormat as d3TimeFormat } from "d3";
import { IBar } from "common";

type CursorComponentProps = {
    cursorX: number | null,
    cursorY: number | null,
    cursorYScaled: number | null,
    maxWidth: number,
    maxHeight: number,
    variant: string,
    cursorBar: IBar | null,
    padding: { x: number, y: number }
};

export const CursorComponent = ({ cursorX, cursorY, cursorYScaled, maxWidth, maxHeight, variant, cursorBar, padding }: CursorComponentProps) => {
    return (
        <g>
            {cursorX !== null && cursorY !== null && (
                <>
                    {/* Vertical line */}
                    <line
                        x1={cursorX}
                        y1={0}
                        x2={cursorX}
                        y2={maxHeight - padding.y}
                        stroke={variant === 'dark' ? '#FFA500' : 'black'}
                    />

                    {/* Horizontal line */}
                    <line
                        x1={0}
                        y1={cursorY}
                        x2={maxWidth - padding.x}
                        y2={cursorY}
                        stroke={variant === 'dark' ? '#FFA500' : 'black'}
                    />
                </>
            )}

            {/* Rectangles indicating x and y positions */}
            {cursorX !== null && cursorY !== null && cursorYScaled && cursorBar && (
                <>
                    {/* X axis rectangle */}
                    <rect
                        x={cursorX - 15} // Adjust as needed
                        y={maxHeight - padding.y} // Adjust as needed
                        width={30} // Adjust as needed
                        height={15} // Adjust as needed
                        fill={variant === 'dark' ? '#FFA500' : 'white'}
                        stroke='black'
                    />
                    <text
                        x={cursorX}
                        y={maxHeight + 7.5 - padding.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                        fontSize="10px"
                        fontWeight="bold"
                    >
                        {/* Display x-axis value */}
                        {d3TimeFormat('%H:%M')(cursorBar.timeUtc)}
                    </text>

                    {/* Y axis rectangle */}
                    <rect
                        x={maxWidth - padding.x} // Adjust as needed
                        y={cursorY - 7.5} // Adjust as needed
                        width={40} // Adjust as needed
                        height={15} // Adjust as needed
                        fill={variant === 'dark' ? '#FFA500' : 'white'}
                        stroke='black'
                    />
                    <text
                        x={maxWidth + (padding.x / 2) - padding.x}
                        y={cursorY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                        fontSize="10px"
                        fontWeight="bold"
                    >
                        {/* Display y-axis value */}
                        {cursorYScaled.toFixed(2)}
                    </text>
                </>
            )}
        </g>
    );
};

export default CursorComponent;