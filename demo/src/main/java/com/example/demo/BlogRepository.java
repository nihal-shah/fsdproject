package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BlogRepository extends CrudRepository<Blog, Integer> {
    List<Blog> findAll();
    @Query("SELECT b FROM Blog b WHERE b.category=?1")
    List<Blog> findcategory(String category);
    @Query("SELECT b FROM Blog b WHERE b.id=?1")
    Blog findByblogid(Integer id);
}
