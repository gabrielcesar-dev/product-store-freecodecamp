# Product Store FreeCodeCamp

## Description

This project is a MERN stack application developed as part of the FreeCodeCamp curriculum. It demonstrates the use of MongoDB, Express.js, React, and Node.js to build a full-stack web application. This is the first project I have created using these technologies, and it serves as a foundational step in my journey to becoming a full-stack developer.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/gabrielcesar-dev/product-store-freecodecamp.git
    ```

2. Navigate to the project directory:

    ```bash
    cd product-store-freecodecamp
    ```

3. Install the dependencies for both the server and client:

    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

4. Set up the environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    PORT=your_port_number
    ```

## Usage

1. Start the backend server:

    ```bash
    npm start
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product by ID
- `DELETE /api/products/:id` - Delete a product by ID

## Acknowledgments

This project was created with the guidance and support of FreeCodeCamp. Their curriculum and resources have been invaluable in helping me learn and apply new technologies.

## License

This project is licensed under the MIT License.
