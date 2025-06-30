// plans.ts
export async function getInternetPlans() {
    return [
      {
        id: "1hour",
        name: "1 Hour Plan",
        price: "KES 15.00",
        downloadSpeed: "Standard download",
        uploadSpeed: "Standard upload",
        dataLimit: "Standard data",
        support: "Basic support",
        isPopular: false,
      },
      {
        id: "2days",
        name: "2 Days Plan",
        price: "KES 200.00",
        downloadSpeed: "Standard download",
        uploadSpeed: "Standard upload",
        dataLimit: "Standard data",
        support: "Standard support",
        isPopular: false,
      },
      {
        id: "5days",
        name: "5 Days Plan",
        price: "KES 300.00",
        downloadSpeed: "Standard download",
        uploadSpeed: "Standard upload",
        dataLimit: "Standard data",
        support: "Priority support",
        isPopular: false,
      },
      {
        id: "10days",
        name: "10 Days Plan",
        price: "KES 500.00",
        downloadSpeed: "Standard download",
        uploadSpeed: "Standard upload",
        dataLimit: "Standard data",
        support: "Priority support",
        isPopular: true,
      },
      {
        id: "30days",
        name: "30 Days Plan",
        price: "KES 1500.00",
        downloadSpeed: "Standard download",
        uploadSpeed: "Standard upload",
        dataLimit: "Standard data",
        support: "Dedicated support",
        isPopular: false,
      },
    ];
  }
  