package com.example.demo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Controller
@RequestMapping(path="/demo")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  BlogRepository blogRepository;
    @PostMapping(path="/signup", consumes = "application/json")
    public  @ResponseBody String signup(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ("User with this email already exists");
        }

        userRepository.save(user);

        return "success";
    }

    @PostMapping(path="/login", consumes = "application/json")
    public ResponseEntity<RequestResponse> login(@RequestBody User user) {
        if(userRepository.existsByEmail(user.getEmail())){
            if(userRepository.password(user.getEmail()).equals(user.getPassword())){
                user.setName(userRepository.findName(user.getEmail()));
                return ResponseEntity.ok(new RequestResponse("success"));
            }
            return ResponseEntity.ok(new RequestResponse("pass incorrect"));
        }
        return ResponseEntity.ok(new RequestResponse("email incorrect"));
    }

    static class RequestResponse {
        private String message;
        private int id;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public RequestResponse(String message, int id) {
            this.message = message;
            this.id = id;
        }
        public RequestResponse(String message) {
            this.message = message;
        }
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @PostMapping("/createblog")
    public ResponseEntity<RequestResponse> createpost(@RequestBody BlogPostRequest blogrequest) {
        String email = blogrequest.getEmail();
        System.out.println(blogrequest.email);
        System.out.println(blogrequest.blog.title);
        System.out.println(blogrequest.blog.body);

        if ("n@gmail.com".equals(email)) {
            Blog blog = blogrequest.getBlog();
            Blog newBlog=blogRepository.save(blog);
            int id=newBlog.getId();
            return ResponseEntity.ok(new RequestResponse("blog created",id));
        }
        return ResponseEntity.ok(new RequestResponse("access denied"));
    }

    static class BlogPostRequest {
        private Blog blog;
        private String email;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Blog getBlog() {
            return blog;
        }

        public void setBlog(Blog blog) {
            this.blog = blog;
        }
    }

    @Autowired
    CloudinaryRepository cloudinaryrepository;
    @PostMapping("/uploadimage")
    public ResponseEntity<Map> addImageToCloudinary(@RequestParam("blogId") Integer blogId, @RequestParam("Image") MultipartFile file) {
        Map data = this.cloudinaryrepository.uploadEventImage(blogId,file);
        System.out.println(data);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<RequestResponse> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session=request.getSession(false);
        session.invalidate();
        return ResponseEntity.ok(new RequestResponse("logged_out"));

    }
}