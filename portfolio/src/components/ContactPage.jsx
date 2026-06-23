"use client";
import { useRef, useState } from "react";
import gsap, { useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hook/useViewTransition";

const ContactPage = () => {
    const containerRef = useRef(null);
    const { navigateTo } = useViewTransition();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("idle");

    useGSAP(
        () => {
            const tl = gsap.timeline();
            tl.fromTo(".reveal-item", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 });
            tl.fromTo(".form-field", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "-=0.6");
        },
        { scope: containerRef }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus("idle");

        // 1. FormData object read karein
        const formData = new FormData(e.target);

        // 2. [CRITICAL FIX]: Agar environment variable read nahi ho raha, toh yahan direct string replace karein
        // 'YOUR_ACTUAL_ACCESS_KEY' ki jagah apni real Web3Forms key copy-paste karein
        const rawAccessKey = process.env.NEXT_PUBLIC_WEB_KEY || "YOUR_ACTUAL_ACCESS_KEY";

        // FormData me access_key variable ko forced insert karein
        formData.set("access_key", rawAccessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData, // Ab is payload me perfect access_key system exit karega
            });

            const data = await response.json();

            if (data.success) {
                setSubmissionStatus("success");
                e.target.reset();
            } else {
                console.error("Web3Forms Rejected Payload:", data);
                setSubmissionStatus("error");
            }
        } catch (error) {
            console.error("Network Architecture Error:", error);
            setSubmissionStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main ref={containerRef} className="min-h-screen w-full bg-black text-[#f5eae4] pt-[8rem] pb-[6rem] px-[4rem] overflow-x-hidden relative flex items-center">
            <button
                onClick={() => navigateTo("/")}
                className="back-button fixed top-[4.5rem] right-[3rem] z-[50] flex items-center gap-3 px-5 py-2.5 cursor-pointer group bg-transparent border border-[#f5eae4]/20 hover:border-amber-500/80 rounded-full overflow-hidden transition-all duration-500 ease-out"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-[#f07026] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />
                <span className="font-mono text-[0.7rem] font-medium tracking-[0.25em] text-[#f5eae4]/70 group-hover:text-black transition-colors duration-300 uppercase select-none">Back</span>
            </button>

            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[5rem] items-center">
                <div className="lg:col-span-5 flex flex-col">
                    <span className="reveal-item font-mono text-[0.8rem] tracking-[0.4em] text-amber-500/80 uppercase mb-3 block">// Secure Transmission</span>
                    <h1 className="reveal-item text-[5rem] font-light leading-[1.1] tracking-tight mb-6">Let's build <br />something <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f07026] to-amber-400">real.</span></h1>
                    <p className="reveal-item text-[1.1rem] text-[#f5eae4]/60 font-light leading-relaxed mb-8 text-balance">Chahe naye active WebGL pipelines build karne hon, structural data management, ya AI multi-agent protocols setup karne hon—drop a line.</p>
                </div>

                <div className="lg:col-span-7 w-full">
                    <div className="p-10 rounded-2xl bg-zinc-950/40 border border-[#f5eae4]/5 backdrop-blur-xl relative">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Anti-spam honeypot */}
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                            {/* Dynamic Status Display Banners (Form ke top par taaki overlap na ho) */}
                            {submissionStatus === "success" && (
                                <div className="text-emerald-400 font-mono text-[0.8rem] tracking-wide bg-emerald-500/10 border border-emerald-500/20 px-5 py-3.5 rounded-xl flex items-center gap-2 animate-fade-in">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    ✓ Message dispatched successfully. Talk soon!
                                </div>
                            )}

                            {submissionStatus === "error" && (
                                <div className="text-rose-400 font-mono text-[0.8rem] tracking-wide bg-rose-500/10 border border-rose-500/20 px-5 py-3.5 rounded-xl flex items-center gap-2 animate-fade-in">
                                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                    ✕ Transmission failed. Check your developer console logs.
                                </div>
                            )}

                            {/* Input Fields Container */}
                            <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-40">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        disabled={isSubmitting || submissionStatus === "success"}
                                        className="w-full bg-zinc-900/50 border border-[#f5eae4]/10 rounded-xl px-4 py-3.5 text-[0.95rem] text-[#f5eae4] placeholder-[#f5eae4]/20 focus:outline-none focus:border-amber-500/50 transition-colors disabled:opacity-40"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-40">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        disabled={isSubmitting || submissionStatus === "success"}
                                        className="w-full bg-zinc-900/50 border border-[#f5eae4]/10 rounded-xl px-4 py-3.5 text-[0.95rem] text-[#f5eae4] placeholder-[#f5eae4]/20 focus:outline-none focus:border-amber-500/50 transition-colors disabled:opacity-40"
                                    />
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="form-field flex flex-col gap-2">
                                <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-40">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    required
                                    placeholder="Describe your system parameters or project outline..."
                                    disabled={isSubmitting || submissionStatus === "success"}
                                    className="w-full bg-zinc-900/50 border border-[#f5eae4]/10 rounded-xl px-4 py-3.5 text-[0.95rem] text-[#f5eae4] placeholder-[#f5eae4]/20 focus:outline-none focus:border-amber-500/50 transition-colors resize-none disabled:opacity-40"
                                ></textarea>
                            </div>

                            {/* Action Submit Button with Explicit Spacing */}
                            <div className="w-full mt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || submissionStatus === "success"}
                                    className={`form-field w-full py-4 font-mono font-semibold text-[0.75rem] tracking-[0.25em] uppercase rounded-xl transition-all duration-500 ease-out flex items-center justify-center gap-2 shadow-lg select-none ${isSubmitting
                                            ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed shadow-none"
                                            : submissionStatus === "success"
                                                ? "bg-emerald-500 text-black border border-emerald-400 scale-[0.98] cursor-default shadow-emerald-500/10"
                                                : "bg-[#f07026] text-black hover:bg-amber-500 hover:scale-[1.01] active:scale-[0.99] shadow-[#f07026]/10 cursor-pointer"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-zinc-600 border-t-zinc-400 inline-block mr-1" />
                                            Transmitting...
                                        </>
                                    ) : submissionStatus === "success" ? (
                                        <>
                                            Submitted!
                                            <svg className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            Dispatch Message
                                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;