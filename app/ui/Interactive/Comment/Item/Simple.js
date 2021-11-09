import React, { useState } from "react";
import ListToggleText from "../List/ToggleText";
import { InteractionCommentCreateUpdateText as CreateText } from "../";
import DeleteText from "../Delete/Text";
import {
  InteractionReactionCreateText,
  InteractionReactionListTextWithCount,
} from "../../Reaction";
import { VStack, HStack, Box, Image, Text } from "native-base";
import { CommenItemController } from "./Controller";
import InteractiveItemSimple from "../../Item/Simple";

function formatTimeCreate(createdAt) {
  var dayjs = require("dayjs");
  let stringTime = "";
  const createdTime = dayjs(createdAt);
  const now = dayjs();
  if (now.format("DD-MM-YYYY") === createdTime.format("DD-MM-YYYY")) {
    if (Number(now.get("hour")) - Number(createdTime.get("hour")) === 0)
      stringTime =
        Number(now.get("minute")) -
        Number(createdTime.get("minute")) +
        " phút trước";
    else
      stringTime =
        Number(now.get("hour")) -
        Number(createdTime.get("hour")) +
        " giờ trước";
  } else stringTime = createdTime.format("DD-MM-YYYY");
  return stringTime;
}
export function UI({ loading, error, comment, refetchInteractiveItem }) {
  const [open, setOpen] = useState(false);
  const stringCreatedAt = formatTimeCreate(comment?.createdAt);
  const { interactive = {} } = comment;
  const { _commentsMeta = {} } = interactive;
  const { count = 0 } = _commentsMeta;
  if (loading) return "...";
  return (
    <Box mx="auto" my="2" w="full">
      <VStack>
        <HStack space="2" display="flex" flexDirection="row" w="full">
          <Image
            source={{
              uri:
                "https://odanang.net" + comment?.createdBy?.avatar?.publicUrl,
            }}
            alt="Profile image"
            size="8"
            rounded="100"
          />
          <VStack flex="1">
            <HStack>
              <Box bgColor="gray.50" rounded="8" px="3" py="2" flex="1">
                <Text color="gray.900" fontWeight="600" fontSize="14">
                  {comment?.createdBy?.name}
                </Text>
                <Text color="gray.700" lineHeight="18">
                  {comment?.content}
                </Text>
              </Box>
            </HStack>
            <HStack ml="3" mt="1" space="3">
              <InteractionReactionCreateText
                idMyInteractive={comment?.my_interactive?.id}
                refetchInteractiveItem={refetchInteractiveItem}
                reactionsCommentList={comment?.my_interactive?.reactions}
              />
              {console.log(comment)}
              <CreateText
                comment={comment}
                onPress={(e) => setOpen((open) => !open)}
              />
              <DeleteText id={comment?.id} />
              <InteractionReactionListTextWithCount
                countLikeComment={
                  comment?.my_interactive?._reactionsMeta?.count
                }
              />
              <Text color="gray.400" fontSize="12">
                {stringCreatedAt}
              </Text>
            </HStack>

            {/* Check if this comment has reponses */}
            <HStack ml="3" mt="1">
              <ListToggleText count={count} />
              {open && comment?.interactive?.id && (
                <InteractiveItemSimple id={comment?.my_interactive?.id} />
              )}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}
export default function InteractionCommentItemSimple(props) {
  return <CommenItemController {...props} UI={UI} />;
}
