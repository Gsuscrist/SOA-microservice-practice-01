'''from products.infrastructure.repository.mysql_product_repository import ProductRepository
from products.infrastructure.router.product_router import initialize_routes

from flask import Flask

app = Flask(__name__)

product_repository = ProductRepository()
initialize_routes(app, product_repository)

if __name__ == '__main__':
    app.run(port=8082)'''

# main.py

from products.infrastructure.repository.mysql_product_repository import ProductRepository
from products.infrastructure.router.product_router import initialize_routes
from products.infrastructure.services.rabbit_mq import start as start_rabbitmq_consumer

from flask import Flask
import threading

app = Flask(__name__)

product_repository = ProductRepository()
initialize_routes(app, product_repository)

def run_flask():
    app.run(port=8082)

if __name__ == '__main__':
    # Ejecutar el consumidor de RabbitMQ en un hilo separado
    rabbitmq_thread = threading.Thread(target=start_rabbitmq_consumer)
    rabbitmq_thread.start()

    # Ejecutar la aplicación Flask en el hilo principal
    run_flask()

