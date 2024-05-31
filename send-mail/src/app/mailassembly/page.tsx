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
import { send } from '@/lib/mailService';
import { toast } from 'react-hot-toast';
import io from "socket.io-client";
import { postLogAssembly } from '@/lib/API/dataAssembly';

export default function MailAssembly() {
  //get log
  const [logData, setLogData] = useState<any[]>([]);
  const [logData21, setLogData21] = useState<any[]>([]);
  // progress
  const [isProcessingAssembly13, setIsProcessingAssembly13] = useState<boolean>(false);
  const [isProcessingAssembly21, setIsProcessingAssembly21] = useState<boolean>(false);

  //null
  // const [successfulMails, setSuccessfulMails] = useState<{ date: string; to: string; }[]>([]);

  // timeLine
  const [timelineItem, setTimeLineItem] = useState([
    { children: 'Start time 13:00 am', success: false },
    { children: 'Get data start', success: false },
    { children: 'Start send mail', success: false },
    { children: 'Send mail success', success: false },
    { children: 'End time', success: false },
  ]);
  const [timelineItem21, setTimeLineItem21] = useState([
    { children: 'Start time 21:00 pm', success: false },
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
    socket.on("dataAssembly", (jsonDataOracle) => {
    
      setLogData(jsonDataOracle);
      setLogData21(jsonDataOracle);

      //console.log(jsonDataOracle);
    });

    //console.log(hostname);
    return () => {
      socket.disconnect();
    };

  }, []);

  const startSendingMail = async () => {
    const updatedTimelineItems = [...timelineItem];
  
    // Bước 1: Start time
    updatedTimelineItems[0].success = true;
    setTimeLineItem(updatedTimelineItems);
  
    // Bước 2 + 3: Start send mail
    await send();
    updatedTimelineItems[1].success = true;
    updatedTimelineItems[2].success = true;
    setTimeLineItem(updatedTimelineItems);
    
    // Bước 4: Send mail success
    updatedTimelineItems[3].success = true;
    setTimeLineItem(updatedTimelineItems);
    const logPoster = new postLogAssembly();
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
    setIsProcessingAssembly13(true);

  };
  const startSendingMail21 = async () => {
    const updatedTimelineItems = [...timelineItem21];
  
    // Bước 1: Start time
    updatedTimelineItems[0].success = true;
    setTimeLineItem21(updatedTimelineItems);
  
    // Bước 2 + 3: Start send mail
    await send();
    updatedTimelineItems[1].success = true;
    updatedTimelineItems[2].success = true;
    setTimeLineItem21(updatedTimelineItems);
    
    // Bước 4: Send mail success
    updatedTimelineItems[3].success = true;
    setTimeLineItem21(updatedTimelineItems);
    const logPoster = new postLogAssembly();
    logPoster.insertLog()
      .then(response => {
        console.log("Insert log successfully:", response);
      })
      .catch(error => {
        console.error("Error insert log:", error);
      });
    
    // Bước 5: End time
    updatedTimelineItems[4].success = true;
    setTimeLineItem21(updatedTimelineItems);
  
    
    toast.success("Send mail success");
    setIsProcessingAssembly21(false);
  };

  
  let timeoutId: NodeJS.Timeout | null = null;
  let intervalId: NodeJS.Timeout | null = null; 

  const handleStart = () => {
    try {
        setIsProcessingAssembly13(true);
        localStorage.setItem('isProcessingAssembly13', 'true');

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentSecond = currentTime.getSeconds();
        const currentMillisecond = currentTime.getMilliseconds();

        const setAndStoreTimeout = (callback: () => void, delay: number) => {
            const timeoutId: NodeJS.Timeout = setTimeout(callback, delay);
            localStorage.setItem('timeoutIdAssembly13', timeoutId.toString());
            localStorage.setItem('timeoutStartTimeAssembly13', Date.now().toString());
            localStorage.setItem('timeoutDelayAssembly13', delay.toString());
        };

        const setAndStoreInterval = (callback: () => void, interval: number) => {
            const intervalId: NodeJS.Timeout = setInterval(callback, interval);
            localStorage.setItem('intervalIdAssembly13', intervalId.toString());
        };

        const getTimeToNext13 = (currentHour: number, 
          currentMinute: number, 
          currentSecond: number, 
          currentMillisecond: number
        ) => {
                const targetHour = 13; // 13 AM
                const targetMinute = 0; // 13:00 AM
                let delay = 0;

                if (currentHour < targetHour || (currentHour === targetHour && currentMinute < targetMinute)) {
                    // Calculate delay to 13:00 AM today
                    delay = (targetHour - currentHour) * 3600000 +
                            (targetMinute - currentMinute) * 60000 -
                            currentSecond * 1000 - currentMillisecond;
                } else {
                    // Calculate delay to 13:00 AM the next day
                    delay = (24 - currentHour + targetHour) * 3600000 +
                            (targetMinute - currentMinute) * 60000 -
                            currentSecond * 1000 - currentMillisecond;
                }
                return delay;
              };

        const timeToNext13 = getTimeToNext13(currentHour, currentMinute, currentSecond, currentMillisecond);

        setAndStoreTimeout(() => {
            startSendingMail();
            setAndStoreInterval(startSendingMail, 24 * 3600000); // 24 hours interval
        }, timeToNext13);

        toast.success("Start successfully");
    } catch (error) {
        console.error('Error:', error);
        toast.error("Send mail failed: " + error);
    }
  };

  // Khi trang được tải lại, kiểm tra và khôi phục các timeout/interval nếu cần
  // const restoreTimeoutAndInterval = () => {
  //   const timeoutStartTimeString = localStorage.getItem('timeoutStartTimeAssembly13');
  //   const timeoutDelayString = localStorage.getItem('timeoutDelayAssembly13');
  //   const intervalIdString = localStorage.getItem('intervalIdAssembly13');

  //   if (timeoutStartTimeString && timeoutDelayString) {
  //       const timeoutStartTime = parseInt(timeoutStartTimeString, 10);
  //       const timeoutDelay = parseInt(timeoutDelayString, 10);
  //       const elapsedTime = Date.now() - timeoutStartTime;
  //       const remainingTime = timeoutDelay - elapsedTime;
  //       if (remainingTime > 0) {
  //           setTimeout(() => {
  //               startSendingMail();
  //               setInterval(startSendingMail, 24 * 3600000);
  //           }, remainingTime);
  //       }
  //   }

  //   if (intervalIdString) {
  //       const intervalId = parseInt(intervalIdString, 10);
  //       clearInterval(intervalId);
  //       setInterval(startSendingMail, 24 * 3600000);
  //   }
  // };

  const restoreIsProcessing = () => {
  const isProcessingString = localStorage.getItem('isProcessingAssembly13');
  if (isProcessingString === 'true') {
      setIsProcessingAssembly13(true);
  } else {
      setIsProcessingAssembly13(false);
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
    setIsProcessingAssembly13(false);
    toast.success("Stop successfully");
  };

  useEffect(() => {
    //restoreTimeoutAndInterval();
    restoreIsProcessing();
    //restoreTimeoutAndInterval21();
    restoreIsProcessing21();
  }, []);


  const handleStart21 = () => {
    try {
      setIsProcessingAssembly21(true);
      localStorage.setItem('isProcessingAssembly21', 'true');

      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentSecond = currentTime.getSeconds();
      const currentMillisecond = currentTime.getMilliseconds();

      const setAndStoreTimeout = (callback: () => void, delay: number) => {
          const timeoutId: NodeJS.Timeout = setTimeout(callback, delay);
          localStorage.setItem('timeoutIdAssembly21', timeoutId.toString());
          localStorage.setItem('timeoutStartTimeAssembly21', Date.now().toString());
          localStorage.setItem('timeoutDelayAssembly21', delay.toString());
      };

      const setAndStoreInterval = (callback: () => void, interval: number) => {
          const intervalId: NodeJS.Timeout = setInterval(callback, interval);
          localStorage.setItem('intervalIdAssembly21', intervalId.toString());
      };

      const getTimeToNext21 = (currentHour: number, 
        currentMinute: number, 
        currentSecond: number, 
        currentMillisecond: number
      ) => {
              const targetHour = 21; // 9 PM
              const targetMinute = 0;
              let delay = 0;

              if (currentHour < targetHour || (currentHour === targetHour && currentMinute < targetMinute)) {
                // Calculate delay to 9:00 PM today
                delay = (targetHour - currentHour) * 3600000 +
                        (targetMinute - currentMinute) * 60000 -
                        currentSecond * 1000 - currentMillisecond;
              } else {
                  // Calculate delay to 9:00 PM the next day
                  delay = (24 - currentHour + targetHour) * 3600000 +
                          (targetMinute - currentMinute) * 60000 -
                          currentSecond * 1000 - currentMillisecond;
              }
              return delay;
            };

      const timeToNext21 = getTimeToNext21(currentHour, currentMinute, currentSecond, currentMillisecond);

      setAndStoreTimeout(() => {
          startSendingMail21();
          setAndStoreInterval(startSendingMail21, 24 * 3600000); // 24 hours interval
      }, timeToNext21);

      toast.success("Start successfully");
  } catch (error) {
      console.error('Error:', error);
      toast.error("Send mail failed: " + error);
  }
  };

  const handleStop21 = () => {
    localStorage.clear();
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    setIsProcessingAssembly21(false);
    toast.success("Stop successfully");
  };

  // Khi trang được tải lại, kiểm tra và khôi phục các timeout/interval nếu cần
  // const restoreTimeoutAndInterval21 = () => {
  //   const timeoutStartTimeString = localStorage.getItem('timeoutStartTimeAssembly21');
  //   const timeoutDelayString = localStorage.getItem('timeoutDelayAssembly21');
  //   const intervalIdString = localStorage.getItem('intervalIdAssembly21');

  //   if (timeoutStartTimeString && timeoutDelayString) {
  //       const timeoutStartTime = parseInt(timeoutStartTimeString, 10);
  //       const timeoutDelay = parseInt(timeoutDelayString, 10);
  //       const elapsedTime = Date.now() - timeoutStartTime;
  //       const remainingTime = timeoutDelay - elapsedTime;
  //       if (remainingTime > 0) {
  //           setTimeout(() => {
  //               startSendingMail21();
  //               setInterval(startSendingMail21, 24 * 3600000);
  //           }, remainingTime);
  //       }
  //   }

  //   if (intervalIdString) {
  //       const intervalId = parseInt(intervalIdString, 10);
  //       clearInterval(intervalId);
  //       setInterval(startSendingMail21, 24 * 3600000);
  //   }
  // };

  const restoreIsProcessing21 = () => {
  const isProcessingString = localStorage.getItem('isProcessingAssembly21');
  if (isProcessingString === 'true') {
      setIsProcessingAssembly21(true);
  } else {
      setIsProcessingAssembly21(false);
  }
  };


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
          <Tabs defaultValue="13" className='w-full h-full'>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="13">13:00 am</TabsTrigger>
              <TabsTrigger value="21">21:00 pm</TabsTrigger>
            </TabsList>
            <TabsContent value="13">
              <Card className='h-[90vh] w-[167vh]'>
                <CardHeader>
                  <CardTitle>Assembly : 13:00 am</CardTitle>
                  <CardDescription>
                    Report run time : 13:00 am
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className='flex flex-col-2 gap-2'>
                      <Button 
                        className='w-[120px] bg-blue-900 hover:bg-blue-950' 
                        onClick={() => handleStart()}
                        disabled={isProcessingAssembly13}
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
                        style={{ color: isProcessingAssembly13 ? 'green' : 'red' }}
                      >
                        {isProcessingAssembly13 ? 'In Progress...' : 'No Progress'}
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
            <TabsContent value="21">
              <Card className='h-[90vh] w-[167vh]'>
                <CardHeader>
                  <CardTitle>Assembly : 21:00 am</CardTitle>
                  <CardDescription>
                    Report run time : 21:00 am
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                <div>
                    <div className='flex flex-col-2 gap-2'>
                      <Button 
                        className='w-[120px] bg-blue-900 hover:bg-blue-950' 
                        onClick={() => handleStart21()}
                        disabled={isProcessingAssembly21}
                      >
                        Start
                      </Button>
                      <Button 
                        className='w-[120px] bg-red-400 hover:bg-red-500'
                        onClick={() => handleStop21()}
                      >
                        Stop
                      </Button>
                      <div 
                        className='mt-2 ml-6 font-semibold' 
                        style={{ color: isProcessingAssembly21 ? 'green' : 'red' }}
                      >
                        {isProcessingAssembly21 ? 'In Progress...' : 'No Progress'}
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
                                    {timelineItem21.map((item, index) => (
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
                                                {logData21 && logData21.map((row) => (
                                                  <TableRow key={row.ID}>
                                                    <TableCell>{formatDateTime(row.DATE_SEND)}</TableCell>
                                                    <TableCell>{formatTime(row.TIME_SEND)}</TableCell>
                                                    <TableCell>{row.SEND_TO}</TableCell>
                                                    <TableCell className='text-green-400'>Success</TableCell>
                                                  </TableRow>
                                                ))}
                                                {logData21.length === 0 && (
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