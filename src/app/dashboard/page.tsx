"use client";

import { useEffect, useState } from "react";
import BasicPage from "@/components/utils/BasicPage";
import TableOrders from "@/components/trade/orders/TableOrders";
import axios from "../api/axios";
import { Pagination } from "@mantine/core";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { architype_bayer } from "../fonts/config"; // Importing the custom font

const PER_PAGE = 10;

function OrbitingMoonsSpinner() {
  return (
    <>
      <style>
        {`
          @keyframes orbit {
            0% {
              transform: rotate(0deg) translateX(50px);
            }
            100% {
              transform: rotate(360deg) translateX(50px);
            }
          }
          .moon {
            position: absolute;
            animation: orbit 10s linear infinite;
            width: 20px; 
            height: 20px; 
            background-color: #03EDED; /* Light blue moons */
            border-radius: 50%;
          }
        `}
      </style>
      <div className="relative w-60 h-32 flex items-center justify-center">
        <div className="absolute w-12 h-12 bg-[#3E3172] rounded-full"></div>
        <div className="moon" style={{ transformOrigin: 'center 40px' }}></div>
        <div className="moon" style={{ transformOrigin: 'center -40px', animationDelay: '2s' }}></div>
      </div>
      <div className="mt-8 mb-8 text-center">
        <p className={`text-[#3E3172] text-4xl font-bold ${architype_bayer.className}`}>
          Loading your orders, please wait...
        </p>
      </div>
    </>
  );
}

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

export default function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);

  const { publicKey, connected } = useUnifiedWallet();

  useEffect(() => {
    if (!publicKey) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data: orders } = await axios.get(
          `/orders?srcAddress=${publicKey?.toString()}`,
        );
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [publicKey]);

  const paginatedOrders = chunk(orders, PER_PAGE);

  return (
    <BasicPage>
      <div className="w-full min-h-[70vh] p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center">
        {!connected && (
          <div className={`font-bold text-4xl flex justify-center items-center ${architype_bayer.className}`}>
            <p>Please connect your wallet to view your orders.</p>
          </div>
        )}

        {connected && isLoading && (
          <div className={`font-bold text-4xl flex justify-center items-center ${architype_bayer.className}`}>
            <OrbitingMoonsSpinner />
          </div>
        )}

        {connected && !orders.length && !isLoading && (
          <div className={`font-bold text-4xl flex justify-center items-center ${architype_bayer.className}`}>
            <p>No orders found.</p>
          </div>
        )}

        {connected && orders.length > 0 && !isLoading && (
          <div className="my-10 w-full">
            <TableOrders
              orders={paginatedOrders[activePage - 1] ?? []}
              isLoading={isLoading}
            />
            <div className="my-8 flex justify-center">
              <Pagination
                total={paginatedOrders.length}
                value={activePage}
                onChange={setPage}
                color="#3e3172"
                size="sm"
                radius="md"
              />
            </div>
          </div>
        )}
      </div>
    </BasicPage>
  );
}
