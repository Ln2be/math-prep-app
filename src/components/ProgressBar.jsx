<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الحل المفصل – امتحان الرياضيات</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #f5f5f5;
            font-family: 'Times New Roman', Times, serif;
            padding: 25px 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .solution-page {
            max-width: 1000px;
            width: 100%;
            background: white;
            padding: 38px 35px;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border-radius: 4px;
            page-break-after: always;
            break-after: page;
        }
        .solution-page:last-child {
            margin-bottom: 0;
            page-break-after: auto;
            break-after: auto;
        }
        h1 {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            border-bottom: 2px solid #222;
            padding-bottom: 12px;
            margin-bottom: 20px;
        }
        .subhead {
            text-align: center;
            font-size: 18px;
            margin-bottom: 28px;
            color: #222;
        }
        .section-title {
            font-weight: bold;
            font-size: 20px;
            margin: 28px 0 16px 0;
            border-right: 6px solid #222;
            padding-right: 12px;
        }
        .solution-block {
            margin-bottom: 24px;
            page-break-inside: avoid;
            break-inside: avoid;
            border-bottom: 1px dashed #ccc;
            padding-bottom: 18px;
        }
        .solution-block:last-child {
            border-bottom: none;
        }
        .q-title {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 6px;
        }
        .q-text {
            font-size: 17px;
            line-height: 1.6;
            margin-bottom: 8px;
            color: #222;
        }
        .answer {
            font-weight: bold;
            font-size: 17px;
            background: #f0f0f0;
            padding: 6px 12px;
            border-radius: 3px;
            display: inline-block;
            margin: 6px 0 8px 0;
            border: 1px solid #888;
        }
        .explanation {
            font-size: 17px;
            line-height: 1.7;
            padding: 10px 14px;
            background: #fafafa;
            border-right: 4px solid #555;
            border-radius: 3px;
            margin-top: 6px;
        }
        .explanation p {
            margin-bottom: 6px;
        }
        .explanation p:last-child {
            margin-bottom: 0;
        }
        .math {
            font-family: 'Times New Roman', Times, serif;
            font-style: italic;
            background: #f4f4f4;
            padding: 0 4px;
            border-radius: 2px;
        }
        .formula {
            font-family: 'Times New Roman', Times, serif;
            font-style: italic;
            text-align: center;
            margin: 8px 0;
            font-size: 18px;
        }
        .footer-note {
            margin-top: 30px;
            border-top: 1px solid #aaa;
            padding-top: 16px;
            text-align: center;
            font-size: 15px;
            color: #333;
        }
        @media print {
            body {
                background: white;
                padding: 0.2in;
            }
            .solution-page {
                box-shadow: none;
                padding: 15px 20px;
                border-radius: 0;
                margin-bottom: 20px;
                break-after: page;
            }
            .solution-page:last-child {
                break-after: auto;
            }
            .solution-block {
                border-bottom: 1px dashed #888;
            }
            .explanation {
                background: #f9f9f9;
                border-right: 4px solid #333;
            }
            .answer {
                background: #eee;
                border: 1px solid #222;
            }
            .math {
                background: transparent;
            }
            .section-title {
                border-right-color: black;
            }
            h1 {
                border-bottom-color: black;
            }
        }
        @supports (font-family: 'Amiri', serif) {
            body, .q-text, .explanation, .answer {
                font-family: 'Amiri', 'Times New Roman', Times, serif;
            }
        }
        .solution-page {
            direction: rtl;
        }
    </style>
</head>
<body>

<!-- ============================================================ -->
<!-- الصفحة الأولى: الحلول 1 إلى 9                              -->
<!-- ============================================================ -->
<div class="solution-page" id="sol-page1">
    <h1>الحل المفصل – امتحان الرياضيات</h1>
    <div class="subhead">الحلول والشروحات – الجزء الأول (الأسئلة 1 إلى 9)</div>

    <!-- القسم: التحويلات والوحدات -->
    <div class="section-title">التحويلات و الوحدات</div>

    <!-- السؤال 1 -->
    <div class="solution-block">
        <div class="q-title">السؤال 1</div>
        <div class="q-text">أي من التحويلات التالية صحيح؟</div>
        <div class="answer">الجواب: أ (1 كم = 1000 م)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>• 1 كم = 1000 م ← صحيح.</p>
            <p>• 1 م = 100 سم (وليس 1000 سم).</p>
            <p>• 1 كغ = 1000 غ (وليس 100 غ).</p>
            <p>• 1 ساعة = 60 دقيقة (وليس 100 دقيقة).</p>
        </div>
    </div>

    <!-- السؤال 2 -->
    <div class="solution-block">
        <div class="q-title">السؤال 2</div>
        <div class="q-text">27 كغ + 33 دكغ + 0.13 طن يساوي (بالهكتوغرام):</div>
        <div class="answer">الجواب: أ (1573.3 هكغ)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>نحوّل كل الوحدات إلى هكتوغرام (هكغ):</p>
            <p>• 27 كغ = 27 × 10 = 270 هكغ (لأن 1 كغ = 10 هكغ)</p>
            <p>• 33 دكغ = 33 × 0.1 = 3.3 هكغ (لأن 1 دكغ = 0.1 هكغ)</p>
            <p>• 0.13 طن = 0.13 × 10000 = 1300 هكغ (لأن 1 طن = 10000 هكغ)</p>
            <p>المجموع: 270 + 3.3 + 1300 = <strong>1573.3 هكغ</strong>.</p>
        </div>
    </div>

    <!-- السؤال 3 -->
    <div class="solution-block">
        <div class="q-title">السؤال 3</div>
        <div class="q-text">كم ديسيمتراً في 524 متراً؟</div>
        <div class="answer">الجواب: ج (5,240 دسم)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>1 متر = 10 ديسيمتر.</p>
            <p>إذن 524 م = 524 × 10 = <strong>5,240 دسم</strong>.</p>
        </div>
    </div>

    <!-- السؤال 4 -->
    <div class="solution-block">
        <div class="q-title">السؤال 4</div>
        <div class="q-text">98363 ثانية تساوي:</div>
        <div class="answer">الجواب: أ (1 يوم 3 ساعات 19 دقيقة 23 ثانية)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>1 يوم = 86400 ثانية ؛ 1 ساعة = 3600 ثانية ؛ 1 دقيقة = 60 ثانية.</p>
            <p>• 98363 ÷ 86400 = 1 يوم، الباقي 98363 − 86400 = 11963 ثانية</p>
            <p>• 11963 ÷ 3600 = 3 ساعات، الباقي 11963 − 10800 = 1163 ثانية</p>
            <p>• 1163 ÷ 60 = 19 دقيقة، الباقي 1163 − 1140 = 23 ثانية</p>
            <p>النتيجة: <strong>1 يوم 3 ساعات 19 دقيقة 23 ثانية</strong>.</p>
        </div>
    </div>

    <!-- السؤال 5 -->
    <div class="solution-block">
        <div class="q-title">السؤال 5</div>
        <div class="q-text">حنفية تملأ وعاءً سعته 14 لتراً في 35 ثانية، كم تحتاج لملء وعاء سعته 20 لتراً؟</div>
        <div class="answer">الجواب: ج (50 ثانية)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>معدل التدفق = 14 لتر ÷ 35 ثانية = 0.4 لتر/ثانية.</p>
            <p>الزمن اللازم لـ 20 لتر = 20 ÷ 0.4 = <strong>50 ثانية</strong>.</p>
        </div>
    </div>

    <!-- القسم: المتتاليات العددية -->
    <div class="section-title">المتتاليات العددية</div>

    <!-- السؤال 6 -->
    <div class="solution-block">
        <div class="q-title">السؤال 6</div>
        <div class="q-text">إذا كانت U₀ = 3 و Uₙ₊₁ = 2Uₙ + 5، فإن U₁ تساوي:</div>
        <div class="answer">الجواب: ب (11)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>U₁ = 2 × U₀ + 5 = 2 × 3 + 5 = 6 + 5 = <strong>11</strong>.</p>
        </div>
    </div>

    <!-- السؤال 7 -->
    <div class="solution-block">
        <div class="q-title">السؤال 7</div>
        <div class="q-text">للمتتالية Vₙ = Uₙ + 5 حيث Uₙ₊₁ = 2Uₙ + 5، المتتالية (Vₙ) هي:</div>
        <div class="answer">الجواب: ب (هندسية أساسها 2)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>Vₙ₊₁ = Uₙ₊₁ + 5 = (2Uₙ + 5) + 5 = 2Uₙ + 10 = 2(Uₙ + 5) = 2Vₙ.</p>
            <p>إذن Vₙ₊₁ = 2 Vₙ: المتتالية هندسية أساسها <strong>2</strong>.</p>
        </div>
    </div>

    <!-- السؤال 8 -->
    <div class="solution-block">
        <div class="q-title">السؤال 8</div>
        <div class="q-text">إذا كان V₀ = 8 وأساس المتتالية الهندسية (Vₙ) هو 2، فإن الحد العام Vₙ يساوي:</div>
        <div class="answer">الجواب: ب (8 × 2ⁿ)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>في متتالية هندسية: Vₙ = V₀ × qⁿ.</p>
            <p>هنا V₀ = 8 و q = 2، إذن Vₙ = <strong>8 × 2ⁿ</strong>.</p>
        </div>
    </div>

    <!-- السؤال 9 -->
    <div class="solution-block">
        <div class="q-title">السؤال 9</div>
        <div class="q-text">المجموع S = Σₖ₌₀²⁰²³ 5ᵏ يساوي:</div>
        <div class="answer">الجواب: أ ((5²⁰²⁴ − 1) / 4)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>مجموع متتالية هندسية حدها الأول 1 وأساسها 5:</p>
            <p>S = (1 − 5²⁰²⁴) / (1 − 5) = (5²⁰²⁴ − 1) / (5 − 1) = <strong>(5²⁰²⁴ − 1) / 4</strong>.</p>
            <p>عدد الحدود هو 2024 (من k = 0 إلى 2023).</p>
        </div>
    </div>

    <div class="footer-note">
        — يتبع الحل في الصفحة التالية —
    </div>
</div>

<!-- ============================================================ -->
<!-- الصفحة الثانية: الحلول 10 إلى 17                          -->
<!-- ============================================================ -->
<div class="solution-page" id="sol-page2">
    <h1>الحل المفصل – الجزء الثاني</h1>
    <div class="subhead">الحلول والشروحات – الأسئلة 10 إلى 17</div>

    <!-- القسم: المعادلات التربيعية واللوغاريتمية والأسية -->
    <div class="section-title">المعادلات التربيعية، اللوغاريتمية و الأسية</div>

    <!-- السؤال 10 -->
    <div class="solution-block">
        <div class="q-title">السؤال 10</div>
        <div class="q-text">حلول المعادلة x² + 4x − 12 = 0 هي:</div>
        <div class="answer">الجواب: أ (x = 2 و x = −6)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>Δ = b² − 4ac = 4² − 4(1)(−12) = 16 + 48 = 64.</p>
            <p>√Δ = 8.</p>
            <p>x₁ = (−4 + 8)/2 = 4/2 = 2 ؛ x₂ = (−4 − 8)/2 = −12/2 = −6.</p>
            <p>الحلول: <strong>x = 2 و x = −6</strong>.</p>
        </div>
    </div>

    <!-- السؤال 11 -->
    <div class="solution-block">
        <div class="q-title">السؤال 11</div>
        <div class="q-text">حلول المعادلة (ln x)² + 4 ln x − 12 = 0 هي:</div>
        <div class="answer">الجواب: ب (x = e² و x = e⁻⁶)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>نضع y = ln x. تصبح المعادلة y² + 4y − 12 = 0.</p>
            <p>حسب السؤال 10: y = 2 أو y = −6.</p>
            <p>إذن ln x = 2 → x = e² ؛ ln x = −6 → x = e⁻⁶.</p>
            <p>الحلول: <strong>x = e² و x = e⁻⁶</strong>.</p>
        </div>
    </div>

    <!-- السؤال 12 -->
    <div class="solution-block">
        <div class="q-title">السؤال 12</div>
        <div class="q-text">حل المعادلة e²ˣ + 4eˣ − 12 = 0 هو:</div>
        <div class="answer">الجواب: أ (x = ln 2)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>نضع z = eˣ (حيث z > 0). تصبح المعادلة z² + 4z − 12 = 0.</p>
            <p>حسب السؤال 10: z = 2 أو z = −6.</p>
            <p>بما أن z = eˣ > 0، نرفض z = −6.</p>
            <p>إذن eˣ = 2 → x = <strong>ln 2</strong>.</p>
        </div>
    </div>

    <!-- السؤال 13 -->
    <div class="solution-block">
        <div class="q-title">السؤال 13</div>
        <div class="q-text">حلول المعادلة x² − 2x − 8 = 0 هي:</div>
        <div class="answer">الجواب: ب (x = −2 و x = 4)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>Δ = (−2)² − 4(1)(−8) = 4 + 32 = 36.</p>
            <p>√Δ = 6.</p>
            <p>x₁ = (2 + 6)/2 = 8/2 = 4 ؛ x₂ = (2 − 6)/2 = −4/2 = −2.</p>
            <p>الحلول: <strong>x = −2 و x = 4</strong>.</p>
        </div>
    </div>

    <!-- السؤال 14 -->
    <div class="solution-block">
        <div class="q-title">السؤال 14</div>
        <div class="q-text">حل المعادلة ln(x+1) + ln(x−3) = ln 5 هو:</div>
        <div class="answer">الجواب: ب (x = 4)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>شروط التعريف: x + 1 > 0 و x − 3 > 0 → x > 3.</p>
            <p>ln[(x+1)(x−3)] = ln 5 → (x+1)(x−3) = 5.</p>
            <p>x² − 3x + x − 3 = 5 → x² − 2x − 8 = 0.</p>
            <p>حسب السؤال 13: x = 4 أو x = −2.</p>
            <p>بما أن x > 3، الحل الوحيد هو <strong>x = 4</strong>.</p>
        </div>
    </div>

    <!-- القسم: النسب المئوية و الأرباح -->
    <div class="section-title">النسب المئوية و الأرباح</div>

    <!-- السؤال 15 -->
    <div class="solution-block">
        <div class="q-title">السؤال 15</div>
        <div class="q-text">ربح تاجر 18% من ثمن الشراء، ولو زاد ثمن البيع 94000 أوقية لكان ربحه 20%. ثمن الشراء هو:</div>
        <div class="answer">الجواب: أ (4,700,000 أوقية)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>الفرق في الربح = 20% − 18% = 2% من ثمن الشراء.</p>
            <p>هذا الفرق يقابل 94000 أوقية.</p>
            <p>إذن 2% من ثمن الشراء = 94000 → ثمن الشراء = 94000 × 100 / 2 = <strong>4,700,000 أوقية</strong>.</p>
        </div>
    </div>

    <!-- السؤال 16 -->
    <div class="solution-block">
        <div class="q-title">السؤال 16</div>
        <div class="q-text">اشترى تاجران 600 دجاجة بـ 110 أوقية للواحدة، ودفعا 3600 أوقية للنقل و 2400 للتغذية. التكلفة الإجمالية هي:</div>
        <div class="answer">الجواب: ب (72,000 أوقية)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>ثمن الدجاج: 600 × 110 = 66,000 أوقية.</p>
            <p>التكاليف الإضافية: 3600 + 2400 = 6,000 أوقية.</p>
            <p>التكلفة الإجمالية: 66,000 + 6,000 = <strong>72,000 أوقية</strong>.</p>
        </div>
    </div>

    <!-- السؤال 17 -->
    <div class="solution-block">
        <div class="q-title">السؤال 17</div>
        <div class="q-text">إذا بيع 92% من الدجاج وحقق التاجران ربحاً قدره 13,560 أوقية، فإن ثمن البيع الكلي هو:</div>
        <div class="answer">الجواب: أ (85,560 أوقية)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>ثمن البيع الكلي = التكلفة الإجمالية + الربح = 72,000 + 13,560 = <strong>85,560 أوقية</strong>.</p>
            <p>ملاحظة: معلومة «92% من الدجاج » ليست ضرورية لهذا الحساب المباشر.</p>
        </div>
    </div>

    <div class="footer-note">
        — يتبع الحل في الصفحة التالية —
    </div>
</div>

<!-- ============================================================ -->
<!-- الصفحة الثالثة: الحلول 18 إلى 23                           -->
<!-- ============================================================ -->
<div class="solution-page" id="sol-page3">
    <h1>الحل المفصل – الجزء الثالث</h1>
    <div class="subhead">الحلول والشروحات – الأسئلة 18 إلى 23</div>

    <!-- القسم: الهندسة و القياس -->
    <div class="section-title">الهندسة و القياس</div>

    <!-- السؤال 18 -->
    <div class="solution-block">
        <div class="q-title">السؤال 18</div>
        <div class="q-text">حقل مستطيل على خريطة مقياسها 1/500 محيطه 50 سم، المحيط الحقيقي هو:</div>
        <div class="answer">الجواب: أ (250 م)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>المقياس 1/500 يعني أن 1 سم على الخريطة يمثل 500 سم في الحقيقة.</p>
            <p>المحيط الحقيقي = 50 سم × 500 = 25,000 سم.</p>
            <p>بالتحويل: 25,000 سم = 250 م.</p>
            <p>إذن المحيط الحقيقي هو <strong>250 م</strong>.</p>
        </div>
    </div>

    <!-- السؤال 19 -->
    <div class="solution-block">
        <div class="q-title">السؤال 19</div>
        <div class="q-text">مساحة دائرة نصف قطرها 4 م (باستعمال π = 3.14) هي:</div>
        <div class="answer">الجواب: أ (50.24 م²)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>المساحة = π × نصف القطر² = 3.14 × 4² = 3.14 × 16 = <strong>50.24 م²</strong>.</p>
        </div>
    </div>

    <!-- السؤال 20 -->
    <div class="solution-block">
        <div class="q-title">السؤال 20</div>
        <div class="q-text">حقل مربع الشكل طول ضلعه 45 م، أحاط بسياج مثبت على أعمدة كل 3 م. عدد الأعمدة هو:</div>
        <div class="answer">الجواب: أ (60)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>محيط المربع = 4 × 45 = 180 م.</p>
            <p>عدد الأعمدة = 180 ÷ 3 = <strong>60 عموداً</strong>.</p>
        </div>
    </div>

    <!-- القسم: السرعة و المسافة -->
    <div class="section-title">السرعة و المسافة</div>

    <!-- السؤال 21 -->
    <div class="solution-block">
        <div class="q-title">السؤال 21</div>
        <div class="q-text">حافلة انطلقت الساعة 9:30 صباحاً ووصلت الساعة 1:30 بعد الظهر. مدة الرحلة هي:</div>
        <div class="answer">الجواب: ب (4 ساعات)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>من الساعة 9:30 إلى الساعة 13:30 يوجد بالضبط <strong>4 ساعات</strong>.</p>
        </div>
    </div>

    <!-- السؤال 22 -->
    <div class="solution-block">
        <div class="q-title">السؤال 22</div>
        <div class="q-text">المسافة بين مدينتين 280 كم، تستهلك الحافلة 18 لتر لكل 100 كم. كمية الوقود المستهلكة هي:</div>
        <div class="answer">الجواب: أ (50.4 لتر)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>الاستهلاك = (280 ÷ 100) × 18 = 2.8 × 18 = <strong>50.4 لتر</strong>.</p>
        </div>
    </div>

    <!-- السؤال 23 -->
    <div class="solution-block">
        <div class="q-title">السؤال 23</div>
        <div class="q-text">سيارة سرعتها 100 كم/ساعة وحافلة سرعتها 60 كم/ساعة، انطلقت الحافلة قبلها بساعتين. متى تلحق السيارة بالحافلة؟</div>
        <div class="answer">الجواب: ب (بعد 3 ساعات)</div>
        <div class="explanation">
            <p><strong>الشرح:</strong></p>
            <p>تقدم الحافلة: 60 × 2 = 120 كم.</p>
            <p>السرعة النسبية: 100 − 60 = 40 كم/ساعة.</p>
            <p>زمن اللحاق: 120 ÷ 40 = <strong>3 ساعات</strong>.</p>
            <p>إذن السيارة تلحق بالحافلة بعد 3 ساعات من انطلاقها.</p>
        </div>
    </div>

    <div class="footer-note">
        — نهاية الحل —
        <br><span style="font-size: 14px;">جميع الأجوبة مع الشروحات المفصلة.</span>
    </div>
</div>

</body>
</html>