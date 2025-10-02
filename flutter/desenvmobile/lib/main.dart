import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Layout + Galeria Demo',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Layout + Galeria'),
      ),
      body: ListView(
        children: const [
          ImageGallerySection(),
          TitleSection(name: 'Lago Majestade', location: 'Verdejante, Brasil'),
          ButtonSection(),
          TextSection(
            description:
                'O Lago Majestade é um local paradisíaco, cercado por montanhas e florestas. '
                'Durante o dia, o reflexo das árvores na água cria um cenário espetacular. '
                'Visitantes podem fazer trilhas, andar de barco ou simplesmente relaxar à beira da água.',
          ),
        ],
      ),
    );
  }
}

class ImageGallerySection extends StatefulWidget {
  const ImageGallerySection({super.key});

  @override
  State<ImageGallerySection> createState() => _ImageGallerySectionState();
}

class _ImageGallerySectionState extends State<ImageGallerySection> {
  // Lista de caminhos de imagem
  final List<String> _images = [
    'assets/images/lake1.jpg',
    'assets/images/lake2.jpg',
    'assets/images/lake3.jpg',
  ];

  int _currentIndex = 0;

  void _nextImage() {
    setState(() {
      _currentIndex = (_currentIndex + 1) % _images.length;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _nextImage,
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 500),
        child: ClipRRect(
          key: ValueKey<String>(_images[_currentIndex]),
          borderRadius: const BorderRadius.only(
            bottomLeft: Radius.circular(24),
            bottomRight: Radius.circular(24),
          ),
          child: Image.asset(
            _images[_currentIndex],
            width: double.infinity,
            height: 240,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}

class TitleSection extends StatelessWidget {
  final String name;
  final String location;
  const TitleSection({
    super.key,
    required this.name,
    required this.location,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                ),
                const SizedBox(height: 4),
                Text(
                  location,
                  style: TextStyle(color: Colors.grey[600]),
                ),
              ],
            ),
          ),
          Icon(Icons.favorite, color: Colors.red[400]),
          const SizedBox(width: 6),
          const Text('350'),
        ],
      ),
    );
  }
}

class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});

  @override
  Widget build(BuildContext context) {
    Color color = Theme.of(context).primaryColor;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildButton(color, Icons.call, 'Ligar'),
          _buildButton(color, Icons.directions, 'Rota'),
          _buildButton(color, Icons.share, 'Compartilhar'),
        ],
      ),
    );
  }

  Widget _buildButton(Color color, IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: color),
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(fontSize: 12, color: color),
        ),
      ],
    );
  }
}

class TextSection extends StatelessWidget {
  final String description;
  const TextSection({super.key, required this.description});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Text(
        description,
        style: const TextStyle(fontSize: 16, height: 1.4),
        softWrap: true,
      ),
    );
  }
}
