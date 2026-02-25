import { randomUUID } from "crypto";
import { Customer } from "./customer.types";

export class CustomerService {
  private customers = new Map<string, Customer>();

  createCustomer(name: string, email: string): Customer {
    const id = randomUUID();
    const customer: Customer = { id, name, email };

    this.customers.set(id, customer);
    console.log("Created customer", customer);

    return customer;
  }

  getCustomer(id: string): Customer {
    const customer = this.customers.get(id);

    if (!customer) {
      console.log("Customer not found with id", id);
      const err = new Error("Customer not found");
      (err as any).status = 404;
      throw err;
    }

    console.log("Found customer with id", id);
    return customer;
  }
}

// Singleton wie @ApplicationScoped
export const customerService = new CustomerService();
