package org.kaiteki.backend.shared.utils;


import org.kaiteki.backend.users.models.enitities.Users;

import static java.util.Objects.isNull;

public final class UserFormattingUtils {
    public static String getFullName(Users user) {
        if (isNull(user)) {
            return "Unknown User";
        }

        return user.getFirstname() + " " + user.getLastname();
    }

    public static String getShortenName(Users user) {
        if (isNull(user)) {
            return "Unknown U.";
        }

        return user.getFirstname() + " " + user.getLastname().charAt(0) + ".";
    }
}
