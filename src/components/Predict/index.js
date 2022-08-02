import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  useColorModeValue,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  RadioGroup,
  Stack,
  Radio,
  NumberInput,
  NumberInputField,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  FormControl,
} from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useParams } from 'react-router-dom';
import Loading from '../../helper/Loading';
import { CONTRACT_ADDRESS, wallet } from '../../helper/tezos';
import heroPurple from '../assets/Homepage-bg-purple.png';
import './index.css';

const BuySellWindow = ({ id, options, flag }) => {
  const [request, setRequest] = React.useState({
    option: options[0],
    quantity: 0,
  });

  const buySubmit = async (e) => {
    e.preventDefault();
    const { option, quantity } = e.target.elements;

    const contract = await wallet.at(CONTRACT_ADDRESS);
    id = Number(id);
    
    if (flag == 1) {
		  const op1 = await contract.methods.checkStatus(id).send();
		  await op1.confirmation(1);
		  alert("Status Changed. Refresh to see latest status");  
	  } else {

      const op = await contract.methods.voteOnprediction(id, option.value).send({
      amount: parseFloat(quantity.value / 100),
    });

    await op.confirmation(1);
    alert('Transaction Completed!');
    }
  };

  return (
    <Tabs variant="soft-rounded" width="100%" padding="0" margin="0">
      {/* <TabList>
        <Tab>Options</Tab>
      </TabList> */}
      <TabPanels padding="0" margin="0">
        <TabPanel padding="0" margin="0">
          <form onSubmit={buySubmit}>
            <Container
              display="flex"
              flexDirection="column"
              padding="0"
              margin="0"
              gap="3"
            >
              <Box padding="0" margin="0">
                <Text fontWeight="bold" fontSize="md" py="2">
                  Pick an option
                </Text>
                <RadioGroup
                  onChange={(e) =>
                    setRequest((request) => {
                      return {
                        ...request,
                        option: e,
                      };
                    })
                  }
                  value={request.option}
                  name="option"
                >
                  <Stack
                    display="flex"
                    direction="row"
                    justifyContent="space-between"
                  >
                    {options.map((option, i) => {
                      return (
                        <Radio key={i} value={option}>
                          <Box
                            borderWidth="1px"
                            borderColor="gray.400"
                            py="2"
                            px="7"
                            borderRadius="2xl"
                          >
                            {option}
                          </Box>
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  Amount of shares (1 Tez can buy 100 shares)
                </Text>
                <NumberInput
                  isRequired
                  placeholder="Shares"
                  onChange={(e) =>
                    setRequest((request) => {
                      return {
                        ...request,
                        quantity: e,
                      };
                    })
                  }
                  value={request.quantity}
                  name="quantity"
                >
                  <NumberInputField />
                </NumberInput>
              </Box>
              <Box>
                <Button w="100%" bgColor="#9C4FFF" type="submit">
                  Buy
                </Button>
              </Box>
            </Container>
          </form>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default function Predict() {
  let { id } = useParams();
  console.log('ID ', id);
  id = id.toString();
  const { predictions } = React.useContext(PredictionContext);
  const [data, setData] = React.useState(null);
  const colors = {
    bg: useColorModeValue('blue.100', 'blue.900'),
    text: useColorModeValue('blue', 'white'),
    border: useColorModeValue('purple.900', 'purple.100'),
    cardBg: useColorModeValue('blue.200', 'blue.700'),
  };

  React.useEffect(async () => {
    if (predictions) {
      const _ = await predictions.get(id).then((value) => {
        return value;
      });
      const contract = await wallet.at(CONTRACT_ADDRESS);
      const storage = await contract.storage();
      const snapshot = await storage.predictionVoteSnapshot
        .get(id)
        .then((value) => {
          return value;
        });
      const snapshotList = [];

      for (let pred of snapshot.keys()) {
        if (pred != 'Total') {
          snapshotList.push({
            id: pred,
            value: Math.round(
              (snapshot.get(pred) * 100) / snapshot.get('Total')
            ).toString(),
          });
        }

        console.log(snapshotList);
      }

      let volume = (snapshot.get('Total') / 100).toString();
      console.log('volume :', volume);
      const currDate = new Date(_.endTime)
	    const timestamp = currDate.getTime();
	    const currTime = Date.now(); 
	    console.log("Time :", currTime , timestamp , _.predictionStatus);
	    let flag = 0
	    if ((timestamp < currTime) && ( _.predictionStatus == "Prediction In-Progress")) {
		      flag = 1
	      }

      setData({
        prediction: _.predictionName,
        lastDate:
          new Date(_.endTime).toLocaleDateString() +
          ' ' +
          new Date(_.endTime).toLocaleTimeString(),
        key: id,
        ref: _.predictionRef,
        result: _.predictionVoteResult,
        pstatus: _.predictionStatus,
        options: _.predictionOptions,
        resultRef: _.predicitonResultRef,
        snap: snapshotList,
        Volume: volume,
        flag : flag,
        disclosure:
          "Predictor is for informational and educational purposes only. We take no custody of anyone's money or cryptocurrency. Predictor displays existing markets live on the Tezos blockchain and is a graphical user interface for both visualizing data and market trends from on-chain activity, and interacting with said smart contracts directly via your Web 3 enabled wallet.",
      });
    }
  }, [predictions]);

  return data ? (
    <Container
      maxWidth="100vw"
      width="auto"
      bgGradient="linear(to-r, #25203a, #181125)"
      height="auto"
      bgImage={heroPurple}
      bgPosition="center"
      bgSize="cover"
      display="flex"
      flexDir="column"
      justifyContent="center"
      px={{ base: '7%', md: '15%', lg: '15%' }}
      py={{ base: '10', md: '20', lg: '20' }}
    >
      <Accordion allowToggle margin="6" className="accordion">
        <AccordionItem
          bgColor="#9C4FFF"
          className="accordion"
          borderRadius="10"
          cursor="none"
        >
          <h2>
            <AccordionButton className="accordion">
              <Box flex="1">Please Read this before making any purchases</Box>
            </AccordionButton>
          </h2>
          <AccordionPanel p="6">{data.disclosure}</AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box bgColor="#180F2B" borderRadius="20">
        <Box
          p="6"
          borderRadius="lg"
          overflow="hidden"
          display="flex"
          flexDirection={{ base: 'column', md: 'column', lg: 'column' }}
          flexWrap="wrap"
          w="100%"
          gap="5"
        >
          <Flex w={{ base: '100%', md: '30%', lg: '30%' }}>
            <Text fontSize="lg">Prediction id: {data.ref} </Text>
          </Flex>

          <Flex w={{ base: '100%', md: '30%', lg: '30%' }}>
            <Text fontSize="sm">Reference: <u> <a href={data.resultRef} target="_blank"> {data.resultRef}  </a> </u>  </Text>
          </Flex>

          <Flex
            w={{ base: '100%', md: '70%', lg: '70%' }}
            flexDirection="column"
            gap="5"
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              margin={{ base: '1', md: '1' }}
              maxWidth="lg"
              overflow="visible"
              textOverflow="clip"
              color="#CEB0F5"
            >
              {data.prediction}
            </Text>
            <Flex flexDirection="row" w="100%" justifyContent="space-between">
              <Flex w="50%">
                <Text fontSize="sm">Open Till : </Text>
                <Text fontSize="sm"> {data.lastDate}</Text>
              </Flex>

              <Flex w="50%">
                <Text fontSize="sm">Result : </Text>
                <Text fontSize="sm"> {data.result}</Text>
              </Flex>
            </Flex>

            <Flex py="3">
              <Text fontSize="sm">Status :</Text>
              <Text fontSize="sm">{data.pstatus}</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex flexDirection="column" padding="5" w="100%">
          <Box className="mid" py="5">
            <Text fontSize="lg">Volume :</Text>

            <Flex>
              <Flex>
                <Text color="white">Total :</Text>
                <Text color="white">{data.Volume} Tez</Text>
              </Flex>

              {data.snap.map((pred, i) => {
                return (
                  <Flex flexDirection="row" px="7">
                    <Box display="flex">
                      <Text>{pred.id} : </Text>
                    </Box>

                    <Box display="flex">
                      <Text>{pred.value} %</Text>
                    </Box>
                  </Flex>
                );
              })}
            </Flex>
          </Box>
        </Flex>

        <Box
          margin="6"
          maxW="max-content"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
        >
          <BuySellWindow id={id} options={data.options} flag={data.flag} />
        </Box>
      </Box>
    </Container>
  ) : (
    <Loading />
  );
}
