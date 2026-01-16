
import React from 'react';
import Footer from '@/components/ui/molecules/Footer';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { Card, CardContent } from '@/components/ui/atoms/card';

// Define historical era data
const historicalEras = [
  {
    name: "Era of Dharma king",
    start: 700,
    end: 850,
    duration: 150,
    color: "#00c06d" // green
  },
  {
    name: "Era of Fragmentation",
    start: 850,
    end: 1000,
    duration: 150, 
    color: "#00bcd4" // teal
  },
  {
    name: "Era of Sarma Lotsawa",
    start: 1000,
    end: 1150,
    duration: 150,
    color: "#29b6f6" // light blue
  },
  {
    name: "Era of early text list",
    start: 1150,
    end: 1300,
    duration: 150,
    color: "#ec407a" // pink
  },
  {
    name: "Era of Narthang",
    start: 1300,
    end: 1320,
    duration: 20,
    color: "#f44336" // red
  },
  {
    name: "Era of Zhalu",
    start: 1320,
    end: 1380,
    duration: 60,
    color: "#ff7043" // orange
  },
  {
    name: "Era of Tshalpa",
    start: 1380,
    end: 1430,
    duration: 50,
    color: "#ffa000" // amber
  }
];

// Create year markers for x-axis
const years = [800, 900, 1000, 1100, 1200, 1300, 1400];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;
  
  const data = payload[0].payload;
  
  return (
    <div className="bg-white p-2 rounded-md shadow-md border border-gray-200">
      <p className="font-semibold">{data.name}</p>
      <p className="text-sm text-gray-600">{data.start} - {data.end}</p>
    </div>
  );
};

const HistoryDevelopment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Historical Eras Gantt Chart</h1>
          
          <Card className="mb-10">
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  data={historicalEras}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
                  <XAxis 
                    type="number" 
                    domain={[700, 1400]} 
                    ticks={years}
                    label={{ value: 'Year', position: 'top', offset: 0 }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={150}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {years.map(year => (
                    <ReferenceLine
                      key={year}
                      x={year}
                      stroke="#e0e0e0"
                      strokeDasharray="3 3"
                    />
                  ))}
                  <Bar 
                    dataKey="duration" 
                    background={{ fill: 'transparent' }}
                    barSize={40}
                    shape={props => {
                      const { x, y, width, height, fill, payload } = props;
                      
                      return (
                        <g>
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill={payload.color}
                          />
                        </g>
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-kangyur-maroon mb-4">About the Historical Development of Kangyur</h2>
            <p className="text-lg">
              The timeline above shows the major historical periods in the development of the Kangyur. 
              Starting from the Era of Dharma kings in the 8th century through to the later compilations 
              including the Tshalpa Kangyur in the 14th century. Each era represents important developments 
              in the collection, translation, and organization of Buddhist texts in Tibet.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryDevelopment;
