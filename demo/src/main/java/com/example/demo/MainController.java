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

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
@RequestMapping(path="/demo")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  BlogRepository blogRepository;
    @PostMapping(path="/signup", consumes = "application/json")
    public  @ResponseBody ResponseEntity<RequestResponse> signup(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.ok(new RequestResponse("User with this email already exists"));

        }

        userRepository.save(user);
        return ResponseEntity.ok(new RequestResponse("success"));
    }
    @GetMapping("/displayblogs")
    public ResponseEntity<List<Blog>> getBlogs() {
        List<Blog> blogs = blogRepository.findAll();
        System.out.println(blogs);
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
    @GetMapping("/displayblogsStockMarket")
    public ResponseEntity<List<Blog>> getBlogsStockMarket() {
        List<Blog> blogs = blogRepository.findcategory("stockmarket");
        System.out.println(blogs);
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
    @GetMapping("/displayblogsCricket")
    public ResponseEntity<List<Blog>> getBlogsCricket() {
        List<Blog> blogs = blogRepository.findcategory("cricket");
        System.out.println(blogs);
        return new ResponseEntity<>(blogs, HttpStatus.OK);
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
        public RequestResponse(String message) {
            this.message = message;
        }
        public RequestResponse(String message, int id) {
            this.message = message;
            this.id = id;
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

    @GetMapping("/blog/{id}")
    public ResponseEntity<Blog> getBlogbyId(@PathVariable String id) {
        Integer blogId = Integer.parseInt(id);

        if (blogRepository.existsById(blogId)) {
            Blog b = blogRepository.findById(blogId).orElse(null);
            return new ResponseEntity<>(b, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RequestResponse> deletekarsale(@PathVariable String id){
        Integer blogId = Integer.parseInt(id);

        if (blogRepository.existsById(blogId)) {
            Blog b = blogRepository.findById(blogId).orElse(null);
            List<User> users=b.getUserlikeblog();
            for(User u: users){
                List<Blog> likeblogofuser=u.getBlog();
                likeblogofuser.remove(b);

            }
            blogRepository.delete(b);
            return ResponseEntity.ok(new RequestResponse("Blog deleted successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<RequestResponse> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session=request.getSession(false);
        session.invalidate();
        return ResponseEntity.ok(new RequestResponse("logged_out"));

    }

    @PostMapping("/bloglikes/{id}/{email}")
    public ResponseEntity<RequestResponse> likeblog(@PathVariable String email, @PathVariable String id){
        User u = userRepository.getuser(email);
        Blog b= blogRepository.findByblogid(Integer.parseInt(id));
        List<Blog> ulikeblog=u.getBlog();
        if(ulikeblog.contains(b)){
            ulikeblog.remove(b);
            u.setBlog(ulikeblog);
            userRepository.save(u);
            return ResponseEntity.ok(new RequestResponse("like remove"));
        }
        else{
            ulikeblog.add(b);
            u.setBlog(ulikeblog);
            userRepository.save(u);
            return ResponseEntity.ok(new RequestResponse("like added"));
        }

    }

    @GetMapping("/getlikeblog/{email}")
    public ResponseEntity<List<Blog>> getlikeblogforuser(@PathVariable String email){
        User u = userRepository.getuser(email);
        List<Blog> ulikeblog=u.getBlog();
        return new ResponseEntity<>(ulikeblog, HttpStatus.OK);
    }
    @GetMapping("/getlikeblog/{id}/{email}")
    public ResponseEntity<RequestResponse> isbloglike(@PathVariable String email,@PathVariable String id){
        int blogid= Integer.parseInt(id);
        User u = userRepository.getuser(email);
        List<Blog> ulikeblog=u.getBlog();
        for(Blog b:ulikeblog){
            if(b.getId()==blogid){
                return ResponseEntity.ok(new RequestResponse("exist"));
            }
            break;
        }
        return ResponseEntity.ok(new RequestResponse("not exist"));
    }

}