use std::fs;

#[derive(Debug)]
struct Node {
    meta: Vec<usize>,
    children: Vec<Node>,
    size: usize,
}

impl Node {
    fn from(slice: &Vec<usize>, index: usize) -> Self {
        let num_children = slice[index];
        let num_meta = slice[index + 1];
        let mut children: Vec<Node> = vec![];
        let mut offset = 2;

        for _ in 0..num_children {
            let child = Node::from(slice, index + offset);
            offset += child.size.clone();
            children.push(child);
        }

        Node {
            meta: slice[index + offset..index + offset + num_meta].to_vec(),
            size: offset + num_meta,
            children,
        }
    }
}

fn read_input(filename: &str) -> Node {
    let numbers: Vec<usize> = fs::read_to_string(filename)
        .expect("Could not find input file")
        .split_whitespace()
        .map(|num| num.parse::<usize>().unwrap())
        .collect();

    Node::from(&numbers, 0)
}

fn fold_by_meta(node: &Node) -> usize {
    node.meta.iter().fold(0, |acc, val| acc + val) +
    node.children.iter()
        .map(|n| fold_by_meta(n))
        .fold(0, |acc, val| acc + val)
}

fn fold_by_value(node: &Node) -> usize {
    if node.children.len() == 0 {
        return fold_by_meta(node)
    }

    node.meta.iter()
        .filter(|val| **val > 0 && **val <= node.children.len())
        .map(|val| fold_by_value(&node.children[val - 1]))
        .fold(0, |acc, val| acc + val)
}

fn main() {
    let tree = read_input("input.txt");
    println!("The answer to puzzle 1 is {}", fold_by_meta(&tree));
    println!("The answer to puzzle 2 is {}", fold_by_value(&tree));
}
