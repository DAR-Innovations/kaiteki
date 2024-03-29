package org.kaiteki.backend.shared.utils;


import org.kaiteki.backend.users.models.enitities.Users;

public final class UserFormattingUtils {
    public static String getFullName(Users user) {
        return user.getFirstname() + " " + user.getLastname();
    }

    public static String getShortenName(Users user) {
        return user.getFirstname() + " " + user.getLastname().charAt(0) + ".";
    }
}
