import React, { useState, useRef } from "react";
import ImageUploading from "react-images-uploading"; // upload image
import {
  Select,
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  Button,
  TextArea,
} from "native-base";

function UI({ loading, error }) {
  const contentRef = useRef();

  const selectChangeHandler = (value) => {
    console.log(value);
  };

  const submitHandler = () => {
    console.log("Post Create Simple");
  };

  return (
    <Box maxW="560" mx="auto" w="full" p="2">
      <Heading
        my="5"
        textAlign="center"
        fontWeight="400"
        fontSize="24"
        color="gray.800"
      >
        Tạo bài viết mới
      </Heading>
      <Box
        px={5}
        py={7}
        rounded={10}
        borderWidth={1}
        borderColor="gray.100"
        bg="gray.50"
      >
        <VStack space={3}>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: "14",
                fontWeight: 400,
              }}
            >
              Nội dung bài viết
            </FormControl.Label>
            <TextArea
              placeholder="Nhập nội dung ..."
              w="full"
              ref={contentRef}
              name="content"
              bgColor="white"
              px={2}
              py={1.5}
              fontSize={14}
              borderWidth={1}
              borderColor="gray.100"
              rounded={6}
              _focus={{
                borderColor: "green.500",
              }}
            />
          </FormControl>

          {!loading && (
            <Button
              onPress={submitHandler}
              rounded={8}
              bgColor="green.500"
              p={2}
              _text={{ color: "white", fontWeight: "600" }}
            >
              ĐĂNG NGAY
            </Button>
          )}
          {loading && (
            <Button
              rounded={8}
              bgColor="green.500"
              p={2}
              _text={{ color: "white", fontWeight: "600" }}
            >
              ĐANG TẢI ...
            </Button>
          )}
        </VStack>
      </Box>
      {error && (
        <Box mt={4} p={3.5} rounded={10} borderWidth={1} borderColor="red.500">
          <Text textAlign="center" color="red.500">
            Vui lòng kiểm tra các thông tin
          </Text>
        </Box>
      )}
    </Box>
  );
}
export default UI;
