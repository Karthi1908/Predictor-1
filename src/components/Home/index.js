import React, { useEffect, useState, useMemo } from 'react';
import './index.css';
import {
  Box,
  Container,
  Text,
  Center,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Heading,
  Image,
  Select,
  Link,
  Flex,
  Button,
  bgImage,
  InputGroup,
  Input,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useNavigate } from 'react-router-dom';
import phoneImg from '../assets/phone.png';
import { AiOutlineRight, AiOutlineSearch } from 'react-icons/ai';

import { AiFillCheckCircle } from 'react-icons/ai';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import HeroBg from '../assets/Herobg.png';
import heroPurple from '../assets/Homepage-bg-purple.png';
import phonePurple from '../assets/phone-purple.png';
import tezo from '../assets/tezo.png';

import Loading from '../../helper/Loading';
import PageLoading from '../../helper/PageLoading';
import PageLoading3 from '../../helper/PageLoading3';

export default function Home() {
  const { predictionsArray } = React.useContext(PredictionContext);
  const [page, setPage] = useState(1);

  const offset = 7;

  const history = useNavigate();
  const colors = {
    bg: useColorModeValue('blue.100', 'blue.900'),
    text: useColorModeValue('blue', 'white'),
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const inProgressArray = predictionsArray.filter(function (prediction) {
    return prediction.value.predictionStatus == 'Prediction In-Progress';
  });
  const completedArray = () => {
    if (predictionsArray) {
      return predictionsArray
        .sort((a, b) => b.value.predictionRef - a.value.predictionRef)
        .filter(function (prediction) {
          return prediction.value.predictionStatus != 'Prediction In-Progress';
        });
    } else {
      return [];
    }
    // return predictionsArray
    //   ? predictionsArray
    //       .sort((a, b) => b.value.predictionRef - a.value.predictionRef)
    //       .filter(function (prediction) {
    //         return (
    //           prediction.value.predictionStatus != 'Prediction In-Progress'
    //         );
    //       })
    //   : [];
  };

  const totalPage = () => {
    return Math.ceil(completedArray()?.length / offset);
  };

  // console.log(page * offset - offset, ' START');

  // console.log(page * offset, ' END');

  return (
    <Container
      width="auto"
      maxWidth="100vw"
      className="main-container"
      height="auto"
      maxHeight="1000vh"
      paddingBottom="15vh"
      paddingStart="0"
      paddingEnd="0"
      bgGradient="linear(to-r, #25203a, #181125)"
    >
      {loading ? (
        <Loading />
      ) : (
        <Box w="100%">
          <Box
            display="flex"
            width="100%"
            paddingStart={{ base: '5vw', md: '15vw', lg: '12vw' }}
            paddingEnd={{ base: '5vw', md: '15vw', lg: '12vw' }}
            paddingTop="15vh"
            paddingBottom="5vh"
            bgImage={heroPurple}
            bgPosition="center"
            bgSize="cover"
            flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
            className="HeroSection"
          >
            <Box
              w={{ base: 'auto', md: '100%', lg: '55%' }}
              display="flex"
              flexDirection={{ base: 'column', md: 'column', lg: 'column' }}
            >
              <Heading
                className="mainfont"
                as="h2"
                fontWeight="semibold"
                size="4xl"
              >
                Predict to EARN
              </Heading>
              <Flex
                alignItems="center"
                justifyContent="start"
                height="auto"
                marginTop="7"
              >
                <Text color="gray">
                  Decentralized Prediction Markets on Tezos
                </Text>

                <Image src={tezo} height="6vh" width="6vh" />
              </Flex>

              <Box
                display="flex"
                justifyContent="space-between"
                width="70%"
                marginTop="7"
              >
                <Box display="flex" alignItems="center">
                  <AiFillCheckCircle color="#9C4FFF" fontSize="21" />
                  &nbsp;&nbsp;<p>Decentralized</p>
                </Box>
                <Box display="flex" alignItems="center">
                  <AiFillCheckCircle color="#9C4FFF" fontSize="21" />
                  &nbsp;&nbsp;<p>Tez Payment</p>
                </Box>
                <Box display="flex" alignItems="center">
                  <AiFillCheckCircle color="#9C4FFF" fontSize="21" />
                  &nbsp;&nbsp;<p>24/7 availability</p>
                </Box>
              </Box>
              <Box
                marginTop="10"
                display="flex"
                flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
              >
                <Link
                  py="3"
                  px="10"
                  bgColor="#9C4FFF"
                  color="#343538"
                  borderRadius="15"
                  textAlign="center"
                  href="#featured"
                  className="links"
                  _focus={{ outline: 'none' }}
                >
                  Get Started
                </Link>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Link
                    py="3"
                    href="/How"
                    paddingStart="10"
                    paddingEnd="3"
                    className="links"
                    _focus={{ outline: 'none' }}
                  >
                    Learn more
                  </Link>
                  <FaLongArrowAltRight fontSize="20" paddingTop="20" />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                width={{ base: '100%', md: '70%', lg: '70%' }}
                marginTop="10"
              >
                {/* <Box display="flex" flexDirection="column" alignItems="start">
                  <Heading
                    as="h3"
                    fontWeight="semibold"
                    size="xl"
                    color="#9C4FFF"
                  >
                    200+
                  </Heading>
                  <p>Markets</p>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="start">
                  <Heading
                    as="h3"
                    fontWeight="semibold"
                    size="xl"
                    color="#9C4FFF"
                  >
                    9000+
                  </Heading>
                  <p>Active Users</p>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="start">
                  <Heading
                    as="h3"
                    fontWeight="semibold"
                    size="xl"
                    color="#9C4FFF"
                  >
                    10M+
                  </Heading>
                  <p>Transactions</p>
                </Box> */}
              </Box>
            </Box>
            <Box
              w={{ base: '100%', md: '100%', lg: '45%' }}
              display="flex"
              justifyContent="center"
            >
              <Image
                boxSize={{ base: '400px', md: '700px', lg: '700px' }}
                objectFit="cover"
                marginTop={{ base: '0px', md: '-100px', lg: '-100px' }}
                src={phonePurple}
                className="phoneImg"
              />
            </Box>
          </Box>

          <Box
            display="flex"
            flexWrap="wrap"
            paddingStart={{ base: '5vh', md: '25vh', lg: '25vh' }}
            paddingEnd={{ base: '5vh', md: '25vh', lg: '25vh' }}
            paddingTop="6vh"
            id="featured"
          >
            <Heading as="h3" fontWeight="semibold" margin="0px" size="lg">
              FEATURED MARKETS
            </Heading>

            <Box
              display="flex"
              flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
              flexWrap="wrap"
              w="100%"
              alignItems="center"
              justifyContent="space-between"
              marginTop="5vh"
            >
              {inProgressArray.map((pred, i) => {
                return (
                  <Box
                    key={i}
                    onClick={() => history('/predict/' + pred.id)}
                    display="flex"
                    w={{ base: '100%', md: '100%', lg: '29%' }}
                    borderRadius="10px"
                    flexDirection="row"
                    padding="20px"
                    backgroundColor="#180F2B"
                    marginBottom="4vh"
                    height="32vh"
                    alignItems="center"
                    flexWrap="wrap"
                    px="5"
                    className="topBox"
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      flexWrap="wrap"
                      height="auto"
                    >
                      <Box w="20%" display="flex" alignItems="center">
                        <Text
                          py="3"
                          px="2"
                          borderRadius="60%"
                          backgroundColor={'#9C4FFF'}
                          fontWeight="bold"
                          border="1px solid"
                          borderColor="#22EF01"
                          fontSize="xs"
                          cursor="pointer"
                          className="circle"
                        >
                          ID:
                          {pred.value.predictionRef}
                        </Text>
                      </Box>

                      <Box w="80%" className="predBox">
                        <Text
                          color={'#CEB0F5'}
                          fontSize="lg"
                          paddingStart="2"
                          cursor="pointer"
                          className="predictionName"
                        >
                          {' '}
                          {pred.value.predictionName}{' '}
                        </Text>
                        <Text
                          paddingStart="2"
                          paddingTop="3"
                          fontSize="sm"
                          className="predictionName"
                        >
                          <b>Status:</b> {pred.value.predictionStatus}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              w="100%"
              paddingStart={{ base: '3', md: '10', lg: '10' }}
              paddingEnd={{ base: '3', md: '10', lg: '10' }}
              paddingTop="5"
              paddingBottom="5"
              bgColor="white"
              borderRadius="10"
              marginTop="20"
            >
              <Box w={{ base: '60%', md: '50%', lg: '50%' }}>
                <Text color="black">Market</Text>
              </Box>
              <Box w={{ base: '40%', md: '50%', lg: '40%' }}>
                <Center color="black">Status</Center>
              </Box>
              <Box w="10%" display={{ base: 'none', md: 'block', lg: 'block' }}>
                <Center color="black">Results</Center>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              w="100%"
              marginTop="5"
            >
              {completedArray()
                .slice(page * offset - offset, page * offset)
                .map((pred, i) => {
                  return (
                    <Box
                      key={i}
                      onClick={() => history('/predict/' + pred.id)}
                      display="flex"
                      maxWidth="100%"
                      borderBottom="1px solid"
                      borderColor="gray"
                      flexDirection="row"
                      padding={{ base: '0px', md: '20px', lg: '20px' }}
                      margin={{ base: '0px', md: '10px', lg: '10px' }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        flexWrap="wrap"
                        w="100%"
                        flexDirection={{ base: 'row', md: 'row', lg: 'row' }}
                        marginTop={{ base: '12px', md: '0px', lg: '0px' }}
                        marginBottom={{ base: '12px', md: '0px', lg: '0px' }}
                      >
                        <Box
                          w={{ base: '20%', md: '5%', lg: '7%' }}
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Text
                            py="3"
                            px="2"
                            borderRadius="50%"
                            backgroundColor={'#9C4FFF'}
                            fontWeight="bold"
                            border="1px solid"
                            borderColor="#22EF01"
                            fontSize="xs"
                          >
                            ID:{pred.value.predictionRef}
                          </Text>
                        </Box>

                        <Box
                          w={{ base: '50%', md: '55%', lg: '50%' }}
                          paddingEnd={{ base: '2', md: '10', lg: '10' }}
                          paddingStart={{ base: '2', md: '3', lg: '3' }}
                        >
                          <Text
                            color="white"
                            cursor="pointer"
                            fontSize={{ base: 'xs', md: 'md', lg: 'md' }}
                          >
                            {' '}
                            {pred.value.predictionName}{' '}
                          </Text>
                        </Box>

                        <Box w="30%">
                          <Center
                            color={'#6EFB57'}
                            fontSize={{ base: 'xs', md: 'md', lg: 'md' }}
                          >
                            {pred.value.predictionStatus}
                          </Center>
                        </Box>
                       <Box w="30%">
                          <Center
                            color={'#6EFB57'}
                            fontSize={{ base: 'xs', md: 'md', lg: 'md' }}
                          >
                            {pred.value.predictionVoteResult}
                          </Center>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
            <Flex
              justifyContent="center"
              alignItems="center"
              marginTop="6vh"
              w="100%"
            >
              <Button
                bgColor="#3B3A3A"
                color="white"
                px="4"
                py="2"
                borderColor="white"
                border="1px solid"
                className="h-btn"
                _focus={{ outline: 'none' }}
                onClick={() => {
                  setPage(page <= 1 ? 1 : page - 1);
                }}
              >
                <HiOutlineArrowSmLeft fontSize="22" />
              </Button>

              <Box display="flex" alignItems="center">
                <Text px="3">Page</Text>
                <Button
                  bgColor="#3B3A3A"
                  color="white"
                  px="4"
                  py="2"
                  borderColor="white"
                  border="1px solid"
                  className="h-btn"
                  _focus={{ outline: 'none' }}
                >
                  {page}
                </Button>
                <Text px="3">of {totalPage()}</Text>
              </Box>

              <Button
                bgColor="#3B3A3A"
                color="white"
                px="4"
                py="2"
                borderColor="white"
                border="1px solid"
                className="h-btn"
                _focus={{ outline: 'none' }}
                onClick={() => {
                  setPage(page >= totalPage() - 1 ? totalPage() : page + 1);
                }}
              >
                <HiOutlineArrowSmRight fontSize="22" />
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Container>
  );
}
