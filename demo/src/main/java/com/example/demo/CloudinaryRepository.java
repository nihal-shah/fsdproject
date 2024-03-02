package com.example.demo;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface CloudinaryRepository {

    public Map uploadEventImage(Integer blogId, MultipartFile file);

}
