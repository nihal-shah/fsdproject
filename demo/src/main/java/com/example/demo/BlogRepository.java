package com.example.demo;

import org.springframework.data.repository.CrudRepository;

public interface BlogRepository extends CrudRepository<Blog, Integer> {
}
