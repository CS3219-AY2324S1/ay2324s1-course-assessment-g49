package com.peerprep.peerprepbackend.rabbitmq;

import com.peerprep.peerprepbackend.common.Complexity;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RabbitMQSender {

    private final RabbitTemplate template;

    private final DirectExchange direct;

    public RabbitMQSender(RabbitTemplate template, DirectExchange direct) {
        this.template = template;
        this.direct = direct;
    }

    AtomicInteger index = new AtomicInteger(0);

    AtomicInteger count = new AtomicInteger(0);

    private final Complexity[] keys = {Complexity.EASY, Complexity.MEDIUM, Complexity.HARD};

    @Scheduled(fixedDelay = 1000, initialDelay = 500)
    public void send() {
        StringBuilder builder = new StringBuilder("Hello to ");
        if (this.index.incrementAndGet() == 3) {
            this.index.set(0);
        }
        Complexity key = keys[this.index.get()];
        builder.append(key).append(' ');
        builder.append(this.count.get());
        String message = builder.toString();
        template.convertAndSend(direct.getName(), String.valueOf(key), message);
        System.out.println(" [x] Sent '" + message + "'");
    }
}
