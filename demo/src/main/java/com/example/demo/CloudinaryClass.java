package com.example.demo;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryClass implements CloudinaryRepository {
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public Map uploadEventImage(Integer blogId, MultipartFile file) {

        try {
            Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());

            // Extract the image URL from the Cloudinary response
            String EventImage = (String) data.get("url");
            System.out.println("Blog ID: " + blogId);
            // Retrieve the post by ID
            Blog blog= blogRepository.findById(blogId).orElseThrow(() -> new RuntimeException("Blog not found"));

            // Set the image URL for the post
            blog.setImage(EventImage);

            // Save the post to update the image URL
            blogRepository.save(blog);

            return data;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}