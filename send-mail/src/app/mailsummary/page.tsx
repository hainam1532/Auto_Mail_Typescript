'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CandlestickChart, History } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Timeline } from 'antd';
import { sendSummary } from '@/lib/mailService';
import { toast } from 'react-hot-toast';
import io from "socket.io-client";
import { postLogSummary } from '@/lib/API/dataSummary';

export default function MailSummary() {
  //get log
  const [logData, setLogData] = useState<any[]>([]);
  // progress
  const [isProcessingSummary20, setIsProcessingSummary20] = useState<boolean>(false);
  
  //null
  // const [successfulMails, setSuccessfulMails] = useState<{ date: string; to: string; }[]>([]);

  // timeLine
  const [timelineItem, setTimeLineItem] = useState([
    { children: 'Start time 20:00 am', success: false },
    { children: 'Get data start', success: false },
    { children: 'Start send mail', success: false },
    { children: 'Send mail success', success: false },
    { children: 'End time', success: false },
  ]);

  useEffect(() => {
    const hostname = typeof document !== 'undefined' ? document.location.hostname : 'Unknown';
    const port = 8080;
    const socket = io(`http://${hostname}:${port}`);

    socket.connect();
    socket.on("dataSummary", (jsonDataOracle) => {
    
      setLogData(jsonDataOracle);

      //console.log(jsonDataOracle);
    });

    //console.log(hostname);
    return () => {
      socket.disconnect();
    };

  }, [logData]);

  const startSendingMail = async () => {
    const updatedTimelineItems = [...timelineItem];
  
    // Bước 1: Start time
    updatedTimelineItems[0].success = true;
    setTimeLineItem(updatedTimelineItems);
  
    // Bước 2 + 3: Start send mail
    await sendSummary();
    updatedTimelineItems[1].success = true;
    updatedTimelineItems[2].success = true;
    setTimeLineItem(updatedTimelineItems);
    
    // Bước 4: Send mail success
    updatedTimelineItems[3].success = true;
    setTimeLineItem(updatedTimelineItems);
    const logPoster = new postLogSummary();
    logPoster.insertLog()
      .then(response => {
        console.log("Insert log successfully:", response);
      })
      .catch(error => {
        console.error("Error insert log:", error);
      });
    
    // Bước 5: End time
    updatedTimelineItems[4].success = true;
    setTimeLineItem(updatedTimelineItems);
  
    toast.success("Send mail success");
    setIsProcessingSummary20(true);

  };
  

  
  let timeoutId: NodeJS.Timeout | null = null;
  let intervalId: NodeJS.Timeout | null = null; 

  const handleStart = () => {
    try {
      setIsProcessingSummary20(true);
      localStorage.setItem('isProcessingSummary20', 'true');

      const currentDay = new Date().getDay();
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentSecond = currentTime.getSeconds();
      const currentMillisecond = currentTime.getMilliseconds();

      const setAndStoreTimeout = (callback: () => void, delay: number) => {
          const timeoutId: NodeJS.Timeout = setTimeout(callback, delay);
          localStorage.setItem('timeoutIdSummary20', timeoutId.toString());
          localStorage.setItem('timeoutStartTimeSummary20', Date.now().toString());
          localStorage.setItem('timeoutDelaySummary20', delay.toString());
      };

      const setAndStoreInterval = (callback: () => void, interval: number) => {
          const intervalId: NodeJS.Timeout = setInterval(callback, interval);
          localStorage.setItem('intervalIdSummary20', intervalId.toString());
      };

      const getTimeToNextSunday20 = (currentHour: number, 
        currentMinute: number, 
        currentSecond: number, 
        currentMillisecond: number, currentDay: number) => {
        const targetHour = 20; // 8 PM
        const targetMinute = 0; // 8:00 PM
        let delay = 0;
    
        const daysUntilNextSunday = (7 - currentDay) % 7;
    
        if (daysUntilNextSunday === 0 && (currentHour < targetHour || (currentHour === targetHour && currentMinute < targetMinute))) {
            // Today is Sunday and the time is before 8 PM
            delay = (targetHour - currentHour) * 3600000 +
                    (targetMinute - currentMinute) * 60000 -
                    currentSecond * 1000 - currentMillisecond;
        } else {
            // Calculate delay to 8:00 PM on the next Sunday
            delay = (daysUntilNextSunday * 24 - currentHour + targetHour) * 3600000 +
                    (targetMinute - currentMinute) * 60000 -
                    currentSecond * 1000 - currentMillisecond;
        }
    
        return delay;
    };
    
    const timeToNextSunday20 = getTimeToNextSunday20(currentHour, currentMinute, currentSecond, currentMillisecond, currentDay);
    
    setAndStoreTimeout(() => {
        startSendingMail();
        setAndStoreInterval(startSendingMail, 7 * 24 * 3600000); // 7 days interval (1 week)
    }, timeToNextSunday20);
    

      toast.success("Start successfully");
  } catch (error) {
      console.error('Error:', error);
      toast.error("Send mail failed: " + error);
  }
};

// Khi trang được tải lại, kiểm tra và khôi phục các timeout/interval nếu cần
// const restoreTimeoutAndIntervalSummary = () => {
//     const timeoutStartTimeString = localStorage.getItem('timeoutStartTimeSummary20');
//     const timeoutDelayString = localStorage.getItem('timeoutDelaySummary20');
//     const intervalIdString = localStorage.getItem('intervalIdSummary20');

//     if (timeoutStartTimeString && timeoutDelayString) {
//         const timeoutStartTime = parseInt(timeoutStartTimeString, 10);
//         const timeoutDelay = parseInt(timeoutDelayString, 10);
//         const elapsedTime = Date.now() - timeoutStartTime;
//         const remainingTime = timeoutDelay - elapsedTime;
//         if (remainingTime > 0) {
//             setTimeout(() => {
//                 startSendingMail();
//                 setInterval(startSendingMail, 24 * 3600000);
//             }, remainingTime);
//         }
//     }

//     if (intervalIdString) {
//         const intervalId = parseInt(intervalIdString, 10);
//         clearInterval(intervalId);
//         setInterval(startSendingMail, 24 * 3600000);
//     }
// };

const restoreisProcessingSummary = () => {
  const isProcessingStitchingString = localStorage.getItem('isProcessingSummary20');
  if (isProcessingStitchingString === 'true') {
    setIsProcessingSummary20(true);
  } else {
    setIsProcessingSummary20(false);
  }
};

const handleStop = () => {
  localStorage.clear();

  if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
  }
  if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
  }
  setIsProcessingSummary20(false);
  toast.success("Stop successfully");
};

useEffect(() => {
  //restoreTimeoutAndIntervalSummary();
  restoreisProcessingSummary();
}, []);



  const getTimeLabel = () => {
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleTimeString()} - ${currentTime.toLocaleDateString("en-GB")}`;

    return formattedTime;
  };

  const formatDateTime = (dateTimeString: string|number|Date) => {
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString("en-GB");

    return formattedDateTime;
  };

  const formatTime = (dateTimeString: string|number|Date) => {
    const formattedTime = new Date(dateTimeString).toLocaleTimeString("en-GB");

    return formattedTime;
  };

  const getTypeStatusStyle = (status: any) => {
    switch (status) {
      case 'S':
        return { text: 'Success', color: 'text-green-500' };
      case 'N':
        return { text: 'Fail', color: 'text-red-500' };
      case null:
      case undefined:
      case '':
        return { text: 'Waiting', color: 'text-gray-500' };
      default:
        return { text: status, color: 'text-gray-500' };
    }
  };


    return (
      <main className="h-full w-full">
        <div className='flex flex-1'>
          <Tabs defaultValue="20" className='w-full h-full'>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="20">20:00 am</TabsTrigger>
            </TabsList>
            <TabsContent value="20">
              <Card className='h-[90vh] w-[167vh]'>
                <CardHeader>
                  <CardTitle>Summary : 20:00 am</CardTitle>
                  <CardDescription>
                    Report run time : 20:00 am
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className='flex flex-col-2 gap-2'>
                      <Button 
                        className='w-[120px] bg-blue-900 hover:bg-blue-950' 
                        onClick={() => handleStart()}
                        disabled={isProcessingSummary20}
                      >
                        Start
                      </Button>
                      <Button 
                        className='w-[120px] bg-red-400 hover:bg-red-500'
                        onClick={() => handleStop()}
                      >
                        Stop
                      </Button>
                      <div
                        className='mt-2 ml-6 font-semibold' 
                        style={{ color: isProcessingSummary20 ? 'green' : 'red' }}
                      >
                        {isProcessingSummary20 ? 'In Progress...' : 'No Progress'}
                      </div>
                    </div>
                    <div className='mt-6'>
                      <Card className='bg-slate-700'>
                        <CardContent>
                          <div className='h-[65vh] w-full mt-4 flex gap-8'>
                            <div className='flex flex-col'>
                              <div className='flex flex-col-2 gap-3'>
                                <CandlestickChart className='h-8 w-8 text-green-400' />
                                <Label className='font-extrabold text-2xl text-white'>Mail sending status :</Label>
                              </div>
                              <div className='ml-6 pt-5 w-[32vh] justify-end'>
                                <Timeline
                                    className='timeline-item text-white font-semibold text-lg'
                                    mode={'left'}
                                    pending="Pending time....!!!"
                                  >
                                    {timelineItem.map((item, index) => (
                                      <Timeline.Item
                                        key={index}
                                        label={item.success ? getTimeLabel() : ''}
                                        color={item.success ? 'green' : 'gray'}
                                      >
                                        {item.children}
                                      </Timeline.Item>
                                    ))}
                                </Timeline>
                              </div>
                            </div>
                            <div className='flex-grow'>
                                  <div>
                                    <Card className='h-[65vh] overflow-x-auto'>
                                      <CardContent>
                                        <div className='flex flex-col'>
                                          <div className='flex flex-col-2 gap-3'>
                                            <History className='h-8 w-8 mt-4 text-blue-500' />
                                            <Label className='mt-4 font-extrabold text-2xl text-black'>
                                              Log history
                                            </Label>
                                          </div>
                                          <div className='mt-4'>
                                            <Table>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead>Date</TableHead>
                                                  <TableHead>Time</TableHead>
                                                  <TableHead>To</TableHead>
                                                  <TableHead>Status</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {logData && logData.map((row) => (
                                                  <TableRow key={row.ID}>
                                                    <TableCell>{formatDateTime(row.DATE_SEND)}</TableCell>
                                                    <TableCell>{formatTime(row.TIME_SEND)}</TableCell>
                                                    <TableCell>{row.SEND_TO}</TableCell>
                                                    <TableCell className={getTypeStatusStyle(row.IS_SYNC)?.color}>
                                                      {getTypeStatusStyle(row.IS_SYNC)?.text}
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                                {logData.length === 0 && (
                                                  <tr style={{textAlign: 'center'}}>
                                                    <td colSpan={3}>No data Log</td>
                                                  </tr>
                                                )}
                                              </TableBody>
                                            </Table>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
}