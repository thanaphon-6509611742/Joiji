### Joiji: A Movie Rental App 🎬

**Welcome to Joiji, a movie rental application developed as part of the CS251 (Database System) course. This React application fetches a list of movies from an API and displays them in a grid layout, each represented by a poster image. The application includes a navigation bar and a menu bar, providing a user-friendly interface for browsing and renting movies.**

![Joiji App Screenshot](/app-screenshot.png)

## Getting Started 🚀

Follow these steps to get Joiji up and running on your local machine.

### Prerequisites 📋

Ensure you have the following installed:

- Node.js and npm (Download [here](https://nodejs.org/en/))
- Git (Download [here](https://git-scm.com/))
- Docker (Download [here](https://www.docker.com/get-started/))

### Installation 🔧

#### Using Docker

1. **Pull Docker Images:**

```sh
docker pull mysql
docker pull phpmyadmin
```

2. **Start MySQL Server:**

Replace `/path/to/your/data` with the path where you want to store your MySQL data:

```sh
docker run --name mysql-server -p 3306:3306 -v /path/to/your/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=joijiDB -d mysql
```

3. **Start phpMyAdmin:**

```sh
docker run --name phpmyadmin -d --link mysql-server:db -p 8080:80 phpmyadmin
```

#### Project Setup

1. **Clone the repository:**

```sh
git clone https://github.com/thanaphon-6509611742/JoijiGit.git
cd joiji
```
2. **Install Dependencies:**

##### Install client dependencies

```sh
cd client
npm install
```

##### Install server dependencies

```sh
cd ../server
npm install
```

3. **Start the Server and Client:**

##### Start the server

```sh
cd ../server
npm run dev
```

##### Start the client

```sh
cd ../client
npm run dev
```

4. **Access the Application:**
- **Client:** [http://localhost:5173](http://localhost:5173)
- **Server:** [http://localhost:3000](http://localhost:3000)
- **phpMyAdmin:** [http://localhost:8080](http://localhost:8080) (Username: `root`, Password: `root`)

### Database Setup 🗄️

1. **Create Database:**
- Open phpMyAdmin, create a new database named `joijiDB`.

![Alt Text](/init-database.gif)

2. **Import Database Structure:**
- Select `joijiDB`, go to "Import", and upload `Database.SQL`.

3. **Import Example Data:**
- Still in `joijiDB`, go to "Import" again, and upload `Example.SQL`.

![Alt Text](/insert-example.gif)

Your database should now be set up and ready for use with Joiji!

## Environment Variables 🌍

This project uses the following environment variables:

- `VITE_API_URL`: Base URL of the API.
- `VITE_PATH_POSTER`: Base path for movie poster images.

## Contributing 🤝

This project welcomes contributions, issues, and feature requests. Check out the issues page or refer to the contributing guide.

## License 📝

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Joiji is designed to be straightforward, accessible, and easy to set up. We hope you enjoy using our movie rental app! 🎥**
