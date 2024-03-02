package com.example.demo;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class Config {
    @Bean
    public Cloudinary getCloudinary(){
        Map config = new HashMap();
        config.put("cloud_name","dsdcthbdv");
        config.put("api_key","183582962714974");
        config.put("api_secret","r8NlghQ-BdUxpe73Q7U8bq58_-U");
        config.put("secure",true);

        return new Cloudinary(config);
    }
}
