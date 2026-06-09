import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";

const BAR_COLORS = [
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-amber-500",
  "bg-emerald-500",
];

const HEX_COLORS = [
  "#06b6d4",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
];

const Dashboard = () => {
  const { data, isLoading, isError } = useGetCreatorCourseQuery();

  const chartData = React.useMemo(() => {
    if (!data?.courses) return [];
    return data.courses.map((course) => ({
      name: course.courseTitle ?? "Untitled",
      price: course.coursePrice ?? 0,
    }));
  }, [data]);

  const maxPrice = Math.max(...chartData.map((c) => c.price), 1);
  const totalCourses = data?.courses?.length ?? 0;
  const totalRevenue = chartData.reduce((sum, c) => sum + c.price, 0);

  return (
    <div className="space-y-8 p-2">
      {/* Stat Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="py-6 hover:shadow-zinc-400 dark:hover:shadow-zinc-900 dark:shadow-xl transition-all duration-300 shadow-xl">
          <CardHeader>
            <CardTitle className="font-bold text-xl">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-cyan-600 dark:text-cyan-200">
              {isLoading ? "—" : totalCourses}
            </p>
          </CardContent>
        </Card>

        <Card className="py-6 hover:shadow-zinc-400 dark:hover:shadow-zinc-900 dark:shadow-xl transition-all duration-300 shadow-xl">
          <CardHeader>
            <CardTitle className="font-bold text-xl">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-cyan-600 dark:text-cyan-200">
              {isLoading ? "—" : `$${totalRevenue.toLocaleString()}`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Card */}
      <Card className="py-6 dark:shadow-xl shadow-xl hover:shadow-zinc-400 dark:hover:shadow-zinc-900 transition-all duration-300">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Course Prices</CardTitle>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Price breakdown across your courses
          </p>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-64 gap-2 text-zinc-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading courses…</span>
            </div>
          )}

          {isError && !isLoading && (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm text-rose-500">Failed to load courses.</p>
            </div>
          )}

          {!isLoading && !isError && chartData.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm text-zinc-400">No courses found.</p>
            </div>
          )}

          {!isLoading && !isError && chartData.length > 0 && (
            <div className="w-full">
              {/* Y-axis labels + Bars */}
              <div className="flex gap-6 items-end h-64 px-2 pt-4 pb-0 relative">
                {/* Y-axis gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pb-6 pt-2 pointer-events-none px-2">
                  {[100, 75, 50, 25, 0].map((pct) => (
                    <div key={pct} className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-400 w-10 text-right shrink-0">
                        ${Math.round((maxPrice * pct) / 100).toLocaleString()}
                      </span>
                      <div className="flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-700" />
                    </div>
                  ))}
                </div>

                {/* Bars */}
                <div
                  className="flex-1 flex items-end justify-around pb-6 pl-14 gap-3"
                  style={{ height: "240px" }} // ← fixed pixel height, not h-full
                >
                  {chartData.map((item, index) => {
                    const heightPx = Math.max((item.price / maxPrice) * 200, 4); // 200px max bar height, 4px min
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-end justify-end flex-1 group"
                        style={{ height: "200px" }}
                      >
                        {/* Price label on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                          ${item.price.toLocaleString()}
                        </div>

                        {/* Bar — pixel height instead of % */}
                        <div
                          className="w-full rounded-t-md transition-all duration-700 ease-out cursor-pointer hover:brightness-110"
                          style={{
                            height: `${heightPx}px`,
                            backgroundColor:
                              HEX_COLORS[index % HEX_COLORS.length],
                            maxWidth: "64px",
                          }}
                          title={`${item.name}: $${item.price}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-around pl-14 gap-3 mt-2 px-2">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 text-center text-[11px] text-zinc-500 dark:text-zinc-400 truncate px-1"
                    title={item.name}
                  >
                    {item.name.length > 10
                      ? item.name.slice(0, 10) + "…"
                      : item.name}
                  </div>
                ))}
              </div>

              {/* Legend dots */}
              <div className="flex flex-wrap gap-3 mt-5 px-2 pl-14">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                      style={{
                        backgroundColor: HEX_COLORS[index % HEX_COLORS.length],
                      }}
                    />
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[100px]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
