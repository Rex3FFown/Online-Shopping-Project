package com.local.onlineshoppingproject.Configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Tüm uç noktalar için
                .allowedOrigins("http://localhost:3000") // React uygulamanızın URL'si
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen HTTP yöntemleri
                .allowCredentials(true); // Kimlik doğrulama bilgilerini (çerezler) kabul et
    }
}
