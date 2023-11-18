package com.peerprep.peerprepmatchingservice.config;

import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import com.peerprep.peerprepmatchingservice.messaging.RedisMessageSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
@RequiredArgsConstructor
public class RedisConfig {

    @Bean
    public RedisTemplate<String, MatchRequest> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, MatchRequest> template =  new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        return template;
    }

    @Bean
    MessageListenerAdapter messageListener(RedisMessageSubscriber redisMessageSubscriber) {
        return new MessageListenerAdapter(redisMessageSubscriber);
    }

    @Bean
    public RedisMessageListenerContainer redisContainer(RedisConnectionFactory connectionFactory, RedisMessageSubscriber redisMessageSubscriber) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(messageListener(redisMessageSubscriber), new PatternTopic("match-channel"));
        return container;
    }
}