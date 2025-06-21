// Zapier Integration Script for Shopify Automation
// This demonstrates how to connect Shopify to automation tools

console.log("🔗 Setting up Zapier integration for Shopify automation...")

// 1. Zapier Webhook Handler for Order Processing
function handleShopifyOrderWebhook(inputData) {
  console.log("📦 Processing new Shopify order via Zapier...")

  const order = inputData.order
  const customer = order.customer

  // Extract dietary requirements from customer tags or metafields
  const customerTags = customer.tags ? customer.tags.split(",").map((tag) => tag.trim()) : []
  const dietaryTags = customerTags.filter((tag) =>
    ["keto", "gluten-free", "dairy-free", "vegan", "vegetarian", "low-carb"].includes(tag.toLowerCase()),
  )

  // Check for NDIS participant
  const isNDISParticipant = customerTags.some(
    (tag) => tag.toLowerCase().includes("ndis") || tag.toLowerCase().includes("participant"),
  )

  // Filter products based on dietary requirements
  const filteredLineItems = order.line_items.filter((item) => {
    const productTags = item.product_tags ? item.product_tags.split(",").map((tag) => tag.trim()) : []

    // If customer has dietary requirements, ensure product meets them
    if (dietaryTags.length > 0) {
      return dietaryTags.every((dietaryTag) =>
        productTags.some((productTag) => productTag.toLowerCase().includes(dietaryTag.toLowerCase())),
      )
    }

    return true // No dietary restrictions
  })

  // Prepare data for production sheet
  const processedOrder = {
    order_id: order.id,
    order_number: order.name,
    customer_name: `${customer.first_name} ${customer.last_name}`,
    customer_email: customer.email,
    dietary_requirements: dietaryTags,
    ndis_participant: isNDISParticipant,
    filtered_items: filteredLineItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      dietary_tags: dietaryTags,
      special_instructions: order.note || "",
    })),
    created_at: order.created_at,
    total_price: order.total_price,
  }

  console.log("✅ Order processed and filtered by dietary requirements")
  return processedOrder
}

// 2. Google Sheets Integration via Zapier
function formatForGoogleSheets(processedOrders) {
  console.log("📊 Formatting data for Google Sheets production sheet...")

  const sheetData = []

  // Header row
  sheetData.push([
    "Order ID",
    "Customer Name",
    "Product Name",
    "Quantity",
    "Dietary Tags",
    "NDIS Participant",
    "Special Instructions",
    "Order Date",
  ])

  // Data rows
  processedOrders.forEach((order) => {
    order.filtered_items.forEach((item) => {
      sheetData.push([
        order.order_number,
        order.customer_name,
        item.name,
        item.quantity,
        order.dietary_requirements.join(", "),
        order.ndis_participant ? "Yes" : "No",
        item.special_instructions,
        new Date(order.created_at).toLocaleDateString(),
      ])
    })
  })

  console.log("✅ Data formatted for Google Sheets")
  return sheetData
}

// 3. Email Notification via Zapier
function prepareEmailNotification(processedOrders) {
  console.log("📧 Preparing email notification for kitchen team...")

  const totalOrders = processedOrders.length
  const totalItems = processedOrders.reduce(
    (sum, order) => sum + order.filtered_items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0,
  )
  const ndisOrders = processedOrders.filter((order) => order.ndis_participant).length

  // Get dietary breakdown
  const dietaryBreakdown = {}
  processedOrders.forEach((order) => {
    order.dietary_requirements.forEach((diet) => {
      dietaryBreakdown[diet] = (dietaryBreakdown[diet] || 0) + 1
    })
  })

  const emailContent = {
    subject: `Production Sheet Ready - ${totalOrders} Orders (${new Date().toLocaleDateString()})`,
    body: `
      <h2>Daily Production Sheet</h2>
      <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Summary</h3>
      <ul>
        <li><strong>Total Orders:</strong> ${totalOrders}</li>
        <li><strong>Total Items:</strong> ${totalItems}</li>
        <li><strong>NDIS Orders:</strong> ${ndisOrders}</li>
      </ul>
      
      <h3>Dietary Breakdown</h3>
      <ul>
        ${Object.entries(dietaryBreakdown)
          .map(([diet, count]) => `<li><strong>${diet}:</strong> ${count} orders</li>`)
          .join("")}
      </ul>
      
      <h3>Special Instructions</h3>
      ${processedOrders
        .filter((order) => order.filtered_items.some((item) => item.special_instructions))
        .map(
          (order) => `
          <p><strong>${order.customer_name} (${order.order_number}):</strong><br>
          ${order.filtered_items
            .filter((item) => item.special_instructions)
            .map((item) => `${item.name}: ${item.special_instructions}`)
            .join("<br>")}</p>
        `,
        )
        .join("")}
      
      <p><em>This production sheet was automatically generated and filtered based on customer dietary requirements.</em></p>
    `,
    recipients: ["kitchen@yourstore.com", "production@yourstore.com"],
  }

  console.log("✅ Email notification prepared")
  return emailContent
}

// 4. Zapier Workflow Configuration
const zapierWorkflows = {
  orderProcessing: {
    name: "Shopify Order to Production Sheet",
    trigger: {
      app: "Shopify",
      event: "New Order",
    },
    actions: [
      {
        app: "Code by Zapier",
        action: "Run JavaScript",
        code: handleShopifyOrderWebhook.toString(),
      },
      {
        app: "Google Sheets",
        action: "Create Spreadsheet Row",
        mapping: "formatForGoogleSheets",
      },
      {
        app: "Email by Zapier",
        action: "Send Outbound Email",
        mapping: "prepareEmailNotification",
      },
    ],
  },

  customerProfileSync: {
    name: "Customer Dietary Profile Sync",
    trigger: {
      app: "Shopify",
      event: "New Customer",
    },
    actions: [
      {
        app: "Code by Zapier",
        action: "Extract Dietary Tags",
      },
      {
        app: "Airtable",
        action: "Create Record",
        table: "Customer Profiles",
      },
    ],
  },
}

// 5. Make.com (Integromat) Alternative Configuration
const makeScenarios = {
  advancedOrderProcessing: {
    name: "Advanced Dietary Order Processing",
    modules: [
      {
        app: "Shopify",
        module: "Watch Orders",
        filter: "status = 'open'",
      },
      {
        app: "Tools",
        module: "Set Variables",
        variables: {
          dietary_requirements: "{{customer.tags}}",
          ndis_status: "{{contains(customer.tags, 'ndis')}}",
        },
      },
      {
        app: "Tools",
        module: "Text Parser",
        pattern: "Extract dietary tags",
      },
      {
        app: "Filter",
        condition: "Dietary requirements match product tags",
      },
      {
        app: "Google Sheets",
        module: "Add a Row",
      },
      {
        app: "Email",
        module: "Send an Email",
      },
    ],
  },
}

console.log("✅ Zapier and Make.com integrations configured")
console.log("🎯 Ready for one-click order processing automation")

// Export for use in automation setup
export { handleShopifyOrderWebhook, formatForGoogleSheets, prepareEmailNotification, zapierWorkflows, makeScenarios }
