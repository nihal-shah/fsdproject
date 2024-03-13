package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.User;



public interface UserRepository extends CrudRepository<User, Integer> {
    boolean existsByEmail(String email);
    @Query("SELECT u.password FROM User u WHERE u.email = ?1")
    String password( String email);

    @Query("SELECT u.name FROM User u WHERE u.email=?1")
    String findName(String email);

    @Query("SELECT u FROM User u WHERE u.email=?1")
    User getuser(String email);
}