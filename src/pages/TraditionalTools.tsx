import CodeBlock from "../components/CodeBlock.tsx";
import CalloutBox from "../components/CalloutBox.tsx";
import StepFlow from "../components/StepFlow.tsx";

const openApiExample = `paths:
  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found`;

const gherkinExample = `Feature: User login

  Scenario: Valid credentials
    Given a registered user with email "dev@example.com"
    When they submit the correct password
    Then they receive a JWT access token
    And the response status is 200

  Scenario: Invalid credentials
    Given a registered user with email "dev@example.com"
    When they submit an incorrect password
    Then the response status is 401
    And the body contains "Invalid credentials"`;

const tddExample = `// Step 1 - Red: write a failing test
test("adds two numbers", () => {
  expect(add(2, 3)).toBe(5); // add() doesn't exist yet
});

// Step 2 - Green: write minimal code to pass
function add(a: number, b: number) {
  return a + b;
}

// Step 3 - Refactor: improve without breaking
export const add = (a: number, b: number): number => a + b;`;

const tddSteps = [
  { number: 1, label: "Red - Write a failing test", description: "Describe the desired behavior as a test. The test must fail because the code doesn't exist yet. This forces you to think about the interface before the implementation." },
  { number: 2, label: "Green - Write the minimal code", description: "Write just enough code to make the test pass. Don't over-engineer. If it's ugly, that's fine - that's what step 3 is for." },
  { number: 3, label: "Refactor - Clean up", description: "Improve the code without breaking any tests. Extract functions, rename variables, remove duplication. Your tests are a safety net." },
];

export default function TraditionalTools() {
  return (
    <div>
      <h1>Traditional Spec Tools</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Battle-tested approaches with deep ecosystem support.
      </p>

      {/* OpenAPI */}
      <h2>OpenAPI / Swagger</h2>
      <p>
        OpenAPI is the industry-standard format for describing REST APIs. You write a YAML or JSON
        schema that defines your endpoints, request/response shapes, authentication, and error codes -
        before any server code is written.
      </p>
      <p><strong>Why it works:</strong> The schema becomes a contract between your backend and frontend teams. Tools auto-generate documentation, client SDKs, and mock servers from it.</p>
      <CodeBlock code={openApiExample} language="yaml" filename="openapi.yaml" />
      <CalloutBox variant="tip">
        Tools like <strong>Swagger UI</strong>, <strong>Redoc</strong>, and <strong>Stoplight</strong> render
        OpenAPI schemas into interactive documentation with zero extra effort.
      </CalloutBox>

      {/* BDD / Gherkin */}
      <h2>BDD / Gherkin (Cucumber)</h2>
      <p>
        Behavior-Driven Development (BDD) uses plain-English scenarios written in the <strong>Gherkin</strong> syntax
        - Given / When / Then - to describe how a system should behave. These scenarios become executable
        tests via frameworks like Cucumber, Behave, or Playwright.
      </p>
      <p>
        <strong>Why it works:</strong> Non-technical stakeholders can read and write Gherkin scenarios.
        This makes them a natural collaboration point between product, QA, and engineering.
      </p>
      <CodeBlock code={gherkinExample} language="gherkin" filename="login.feature" />
      <CalloutBox variant="note">
        Gherkin scenarios work best when they describe <em>behavior</em>, not implementation.
        "When the user clicks Submit" is an implementation detail. "When the user logs in" is behavior.
      </CalloutBox>

      {/* TDD */}
      <h2>TDD - Test-Driven Development</h2>
      <p>
        TDD is the practice of writing tests <em>before</em> the code they test. A test is a spec in
        code form - it defines exactly what a unit of code must do.
      </p>
      <StepFlow steps={tddSteps} />
      <CodeBlock code={tddExample} language="typescript" filename="math.test.ts" />
      <CalloutBox variant="key">
        TDD isn't about testing - it's about design. Writing the test first forces you to think about
        the API your code will expose before you think about how it will work internally.
      </CalloutBox>
    </div>
  );
}
