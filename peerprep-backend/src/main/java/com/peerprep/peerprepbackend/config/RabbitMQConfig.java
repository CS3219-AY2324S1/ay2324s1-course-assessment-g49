package com.peerprep.peerprepbackend.config;

import com.peerprep.peerprepbackend.common.Complexity;
//import com.peerprep.peerprepbackend.rabbitmq.RabbitMQReceiver;
import com.peerprep.peerprepbackend.rabbitmq.RabbitMQSender;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Bean
    public DirectExchange direct() {
        return new DirectExchange("match.direct");
    }

    @Bean
    public Queue easyComplexityQueue() {
        return new Queue("easyComplexityQueue");
    }

    @Bean
    public Queue mediumComplexityQueue() {
        return new Queue("mediumComplexityQueue");
    }

    @Bean
    public Queue hardComplexityQueue() {
        return new Queue("hardComplexityQueue");
    }

    @Bean
    public Binding bindingEasy(DirectExchange direct, Queue easyComplexityQueue) {
        return BindingBuilder.bind(easyComplexityQueue)
                .to(direct)
                .with(Complexity.EASY);
    }

    @Bean
    public Binding bindingMedium(DirectExchange direct, Queue mediumComplexityQueue) {
        return BindingBuilder.bind(mediumComplexityQueue)
                .to(direct)
                .with(Complexity.MEDIUM);
    }

    @Bean
    public Binding bindingHard(DirectExchange direct, Queue hardComplexityQueue) {
        return BindingBuilder.bind(hardComplexityQueue)
                .to(direct)
                .with(Complexity.HARD);
    }

}
