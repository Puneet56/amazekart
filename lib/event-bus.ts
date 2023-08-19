class EventBus {
	private static instance: EventBus;
	private events: { [key: string]: Function[] } = {};

	private constructor() {}

	static getInstance(): EventBus {
		if (!EventBus.instance) {
			EventBus.instance = new EventBus();
		}

		return EventBus.instance;
	}

	subscribe(event: string, callback: Function): void {
		if (!this.events[event]) {
			this.events[event] = [];
		}

		this.events[event].push(callback);
	}

	emit(event: string, data?: any): void {
		if (this.events[event]) {
			this.events[event].forEach((callback) => callback(data));
		}
	}

	unsubscribe(event: string): void {
		delete this.events[event];
	}
}

export const eventBus = EventBus.getInstance();
