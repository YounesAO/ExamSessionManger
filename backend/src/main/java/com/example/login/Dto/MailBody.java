package com.example.login.Dto;


import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String text) {

}
