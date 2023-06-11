class Node<T> {
    get next() {
        return this._next;
    }
    set next(node: Node<T> | null) {
        this._next = node;
    }

    get value() {
        return this._value;
    }
    private _next: Node<T> | null = null;
    private _value: T;
    constructor(value: T) {
        this._value = value;
    }
}

export default class Queue<T> {
    get length() {
        return this._length;
    }
    private head: Node<T> | null = null;
    private rear: Node<T> | null = null;
    private _length = 0;
    constructor(values: T[] = []) {
        values.forEach((value) => this.enqueue(value));
    }

    enqueue(value: T) {
        const newNode = new Node(value);
        if (!this.rear) {
            this.head = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this._length++;
    }
    dequeue() {
        if (!this.head) return undefined;
        const returnVal = this.head.value;
        if (this._length === 1) {
            this.head = null;
            this.rear = null;
        } else {
            this.head = this.head.next;
        }
        this._length--;
        return returnVal;
    }
}
