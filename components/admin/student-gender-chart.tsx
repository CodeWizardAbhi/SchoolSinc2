"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: "Boys", value: 3178, color: "#0f172a" }, // Navy Blue
    { name: "Girls", value: 2731, color: "#94a3b8" }, // Slate 400
];

export function StudentGenderChart() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-base">Students</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                formatter={(value: string, entry: any) => (
                                    <span className="text-slate-600 dark:text-slate-400 font-medium ml-1">{value} ({entry.payload.value})</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
