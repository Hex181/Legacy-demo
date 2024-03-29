import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/icons/logo.svg";
import { close, hamburger } from "../assets/svgs/svg";
import CustomButton from "../common/CustomButton";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import getUserInterval, {
  connect as connectWallet,
  checkConnection,
  disconnect as disconnectWallet,
  isDisconnected,
  hasLegacy
} from "../utils/helpers"

const Navbar = () => {
  const navigate = useNavigate();
  const [openNavBar, setOpenNavBar] = useState(false);
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const disconnect = () => {
    disconnectWallet();
    setIsConnected(false);
    navigate('/');
  }

  const goToProfile = async () => {
    if (!isDisconnected()) {
      if (await hasLegacy(checkConnection())) {
        navigate('/profile');
      }
    } else {
      toaster.warning("Connect your wallet first")
    }
  }

  const connect = async () => {
    try {
      const account = await connectWallet()
      if (account) {
        setUser(account);
        setIsConnected(true);
      }
    } catch (err) {
      setIsConnected(false);
      console.log(err)
    }
  }

  useEffect(() => {
    try {
      if (!isDisconnected()) {
        const account = checkConnection();
        if (account) {
          setIsConnected(true)
          setUser(account);
        }
        else {
          disconnect();
          navigate('/');
        }
      } else {
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "block", lg: "flex" }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-around"
          display={{ base: "none", lg: "flex" }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Link to="/">
              <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
            </Link>
            <Box
              onClick={() => setOpenNavBar(!openNavBar)}
              display={{ base: "block", lg: "none" }}
            >
              {openNavBar ? close : hamburger}
            </Box>
          </Flex>
          <Text
            cursor="pointer"
            ml={{ base: "0", lg: "100px" }}
            mt={{ base: "20px", lg: "0" }}
            _hover={{ color: "brand.teal" }}
            color="brand.white"
            onClick={() => { goToProfile() }}
          >
            Profile
          </Text>
            <a href="/#about-us">
            <Text
              cursor="pointer"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              About us
            </Text>
            </a>
          <a href="/#how-it-works">
            <Text
              cursor="pointer"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              How it works
            </Text>
          </a>
        </Flex>
        {isConnected ?
          <CustomButton
            bg="brand.teal"
            color="brand.white"
            mt={{ base: "20px", lg: "0" }}
            d={{ base: "none", lg: "flex" }}
            hoverColor="brand.primary"
            onClick={disconnect}
          >
            Disconnect
          </CustomButton>
          :
          <CustomButton bg="none" border="1px solid #15F4CB" color="brand.white" hoverColor="brand.teal" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} d={{ base: "none", lg: "flex" }} onClick={connect}>Connect</CustomButton>
        }

      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="20px"
        display={{ base: "flex", lg: "none" }}
      >
        <Link to="/">
          <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
        </Link>
        <Box
          onClick={() => setOpenNavBar(!openNavBar)}
          display={{ base: "block", lg: "none" }}
        >
          {openNavBar ? close : hamburger}
        </Box>
      </Flex>

      {openNavBar && (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          display={{ base: "block", lg: "flex" }}
          height={{ base: "100vh", lg: "" }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-around"
            display={{ base: "block", lg: "flex" }}
            w="100%"
          >
            <Text
              cursor="pointer"
              textAlign="center"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
              onClick={() => { goToProfile() }}
            >
              Profile
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              About us
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              How it works
            </Text>
          </Flex>
          {
            isConnected ?
              <CustomButton
                bg="none"
                color="brand.white"
                mt={{ base: "20px", lg: "0" }}
                w="100%"
                hoverColor="brand.teal"
                border="1px solid #15F4CB"
                onClick={disconnect}
              >
                Disconnect
              </CustomButton>
              :
              <CustomButton bg="none" color="brand.white" hoverColor="brand.teal"
                border="1px solid #15F4CB" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} w="100%" onClick={connect}>Connect</CustomButton>
          }
        </Flex>
      )}
    </>
  );
};

export default Navbar;
