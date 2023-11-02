//package com.peerprep.peerprepbackend.rabbitmq;
//
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.util.StopWatch;
//
//public class RabbitMQReceiver {
//    @RabbitListener(queues = "#{easyComplexityQueue.name}")
//    public void receiveEasy(String in) throws InterruptedException {
//        receive(in, 1);
//    }
//
//    @RabbitListener(queues = "#{mediumComplexityQueue.name}")
//    public void receiveMedium(String in) throws InterruptedException {
//        receive(in, 2);
//    }
//
//    @RabbitListener(queues = "#{hardComplexityQueue.name}")
//    public void receiveHard(String in) throws InterruptedException {
//        receive(in, 3);
//    }
//
//    public void receive(String in, int receiver) throws InterruptedException {
//        StopWatch watch = new StopWatch();
//        watch.start();
//        System.out.println("instance " + receiver + " [x] Received '" + in + "'");
//        doWork(in);
//        watch.stop();
//        System.out.println("instance " + receiver + " [x] Done in " +
//                watch.getTotalTimeSeconds() + "s");
//    }
//
//    private void doWork(String in) throws InterruptedException {
//        for (char ch : in.toCharArray()) {
//            if (ch == '.') {
//                Thread.sleep(1000);
//            }
//        }
//    }
//}
