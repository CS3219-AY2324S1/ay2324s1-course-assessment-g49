package com.peerprep.peerprepapigateway.config;

import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, String> template =  new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setValueSerializer(new StringRedisSerializer());
        template.setKeySerializer(new StringRedisSerializer());
        return template;
    }

    @Bean
    public ChannelTopic topic() {
        return new ChannelTopic("match-channel");
    }
}
