package org.kaiteki.backend.shared.utils;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
@RequiredArgsConstructor
public class EmailService {
    @Value("${spring.mail.host}")
    private String host;
    @Value("${spring.mail.username}")
    private String fromEmail;

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;
    public static final String UTF_8_ENCODING = "UTF-8";


    @Async
    public void sendSimpleMessage(String subject, String to, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject(subject);
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText(content);
            emailSender.send(message);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send email");
        }
    }

    @Async
    void sendMimeWithAttachment(String name, String to, String text) {}

    @Async
    void sendMimeWithEmbeddedFiles(String name, String to, String text) {}

    @Async
    void sendMimeWithEmbeddedImages(String name, String to, String text) {}

    @Async
    void sendHtml(String name, String to, String text) {}

    @Async
    public void sendHtml(String subject, String to, String templateName, Context context) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, UTF_8_ENCODING);

            helper.setPriority(1);
            helper.setSubject(subject);
            helper.setFrom(String.format("KAITEKI <%s>", fromEmail));
            helper.setTo(to);

            String text = templateEngine.process(templateName, context);
            helper.setText(text, true);
            message.saveChanges();

            emailSender.send(message);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send email");
        }
    }
}
