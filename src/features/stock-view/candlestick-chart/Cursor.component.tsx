import React from "react";
import { timeFormat as d3TimeFormat } from "d3";

type CursorComponentProps = {
    cursorX: number | null,
    cursorY: number | null,
    cursorYScaled: number | null,
    maxWidth: number,
    maxHeight: number,
    variant: string,
    margin: { top: number, right: number, bottom: number, left: number },
    cursorBar: any
};

export const CursorComponent = ({ cursorX, cursorY, cursorYScaled, maxWidth, maxHeight, variant, margin, cursorBar }: CursorComponentProps) => {
    return (
        <g>
            {cursorX !== null && cursorY !== null && (
                <>
                    {/* Vertical line */}
                    <line
                        x1={cursorX}
                        y1={margin.top}
                        x2={cursorX}
                        y2={maxHeight}
                        stroke={variant === 'dark' ? '#FFA500' : 'black'}
                    />

                    {/* Horizontal line */}
                    <line
                        x1={0}
                        y1={cursorY}
                        x2={maxWidth - margin.right}
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
                        y={maxHeight} // Adjust as needed
                        width={30} // Adjust as needed
                        height={15} // Adjust as needed
                        fill={variant === 'dark' ? '#FFA500' : 'white'}
                        stroke='black'
                    />
                    <text
                        x={cursorX}
                        y={maxHeight + 7.5}
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
                        x={maxWidth - margin.right} // Adjust as needed
                        y={cursorY - 7.5} // Adjust as needed
                        width={40} // Adjust as needed
                        height={15} // Adjust as needed
                        fill={variant === 'dark' ? '#FFA500' : 'white'}
                        stroke='black'
                    />
                    <text
                        x={maxWidth - margin.right / 2}
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