import { CustomerService } from "../src/customer/customer.service";

describe("CustomerService", () => {
  let service: CustomerService;

  beforeEach(() => {
    service = new CustomerService();
  });

  test("should create a customer", () => {
    const customer = service.createCustomer("Alice", "alice@example.com");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Alice");
    expect(customer.email).toBe("alice@example.com");
  });

  test("should retrieve an existing customer", () => {
    const created = service.createCustomer("Bob", "bob@example.com");
    const found = service.getCustomer(created.id);

    expect(found).toEqual(created);
  });

  test("should throw when customer does not exist", () => {
    expect(() => service.getCustomer("unknown-id")).toThrow();
  });
});
