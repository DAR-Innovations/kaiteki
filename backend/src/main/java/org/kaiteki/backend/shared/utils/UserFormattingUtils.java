package org.kaiteki.backend.shared.utils;


import org.kaiteki.backend.users.models.Users;

public class UserFormattingUtils {
    public static String getFullName(Users user) {
        return user.getFirstname() + " " + user.getLastname();
    }
}
