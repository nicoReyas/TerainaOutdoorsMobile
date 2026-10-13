
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { getProducts } from "../../lib/shopify";

export default function HomeScreen() {
  const [message, setMessage] = useState("Connecting to Shopify...");

  useEffect(() => {
    getProducts()
      .then((products) => {
        setMessage(
          `Connected successfully!\nFound ${products.length} products:\n\n` +
          products.map((p: any) => p.title).join("\n")
        );
      })
      .catch((error) => {
        setMessage("Connection failed:\n" + error.message);
      });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 30,
      }}
    >
      <Text style={{ fontSize: 22, color: "black" }}>
        {message}
      </Text>
    </ScrollView>
  );
}
