package com.example.security.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    @GetMapping(path ="/string")
    public ResponseEntity<String> fetchString(){
        String data = "Backend string value";
        return new ResponseEntity<String>(data, HttpStatus.OK);
    }

}
