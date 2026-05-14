import { Button, Container, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineWbSunny } from "react-icons/md";
import { useColorMode } from "./ui/color-mode";
import { IoMoonOutline } from "react-icons/io5";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Link to="/">
          <Flex fontSize={"2xl"} fontWeight={"bold"}>
            <Text>MERN</Text>
            <Text color={"blue.400"}>Course</Text>
          </Flex>
        </Link>

        <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant="ghost">
              <Icon size="2xl" fontWeight="extrabold">
                <CiSquarePlus />
              </Icon>
            </Button>
          </Link>

          <Button variant="ghost" onClick={toggleColorMode}>
            <Icon size="xl">
              {colorMode === "light" ? <IoMoonOutline /> : <MdOutlineWbSunny />}
            </Icon>
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default NavBar;
