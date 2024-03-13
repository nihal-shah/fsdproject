package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Blog {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    String title;
    String body;
    String image;
    String category;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    @ManyToMany(cascade = CascadeType.PERSIST, mappedBy ="blog")
    @JsonIgnore
    List<User> userlikeblog;

    public List<User> getUserlikeblog() {
        return userlikeblog;
    }

    public void setUserlikeblog(List<User> userlikeblog) {
        this.userlikeblog = userlikeblog;
    }

    @Override
    public String toString() {
        return "Blog [id = "+id+", title = "+title+", Image = "+image+"]";
    }
}
