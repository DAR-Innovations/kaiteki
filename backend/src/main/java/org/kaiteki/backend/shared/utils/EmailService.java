package org.kaiteki.backend.shared.utils;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
public class EmailSender {
    private static final Logger logger = LoggerFactory.getLogger(EmailSender.class);

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Async("threadPoolTaskExecutor")
    public Future<Boolean> sendEmail(String emailTo, String subject, String content){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailFrom);
        message.setSubject(subject);
        message.setTo(emailTo);
        message.setText(content);

        try{
            javaMailSender.send(message);
            return AsyncResult.forValue(Boolean.TRUE);
        }
        catch (MailException e) {
            logger.error("sendEmail", e);
            return AsyncResult.forExecutionException(e);
        }
    }
}
