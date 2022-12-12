import { Box } from "@chakra-ui/react";
import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";

const UserBadgeItem = ({ user, handleFunction, selectedChat }) => {
  const { user: admin } = ChatState();

  return (
    <Box
      px={3}
      py={2}
      borderRadius="2xl"
      m={1}
      mb={2}
      variant="solid"
      fontSize={13}
      backgroundColor={user._id === admin._id ? "#2D3748" : "#2B6CB0"}
      color="white"
      cursor="pointer"
    >
      {user.name}
      {selectedChat?.groupAdmin ? (
        admin._id !== user._id &&
        selectedChat?.groupAdmin._id === admin._id && (
          <CloseIcon pl={1} onClick={handleFunction} />
        )
      ) : (
        <CloseIcon pl={1} onClick={handleFunction} />
      )}
    </Box>
  );
};

export default UserBadgeItem;
